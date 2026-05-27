#!/usr/bin/env python3
"""Generate a transcript for a media URL via local ASR (faster-whisper).

Fallback for sources with NO captions: downloads the audio stream with
yt-dlp, transcribes it locally with faster-whisper (no API, no system
ffmpeg needed — PyAV decodes the audio), and emits the same JSON contract
as extract-transcript.py so callers can treat both interchangeably.

Outputs JSON to stdout:
  {"status": "ok", "extraction_method": "whisper-local", "subtitle_lang": "en", "transcript": "..."}
  {"status": "error", "extraction_method": null, "subtitle_lang": null, "transcript": null}

Requires: yt-dlp, faster-whisper (pip install faster-whisper)
"""

import argparse
import glob
import json
import os
import shutil
import subprocess
import sys
import tempfile


def js_runtime_args():
    """Return yt-dlp --js-runtimes args for the first available JS runtime.

    Mirrors extract-transcript.py: modern YouTube extraction needs a JS
    runtime, and yt-dlp only enables deno by default. Returns [] if none found.
    """
    for runtime in ("deno", "node", "bun"):
        if shutil.which(runtime):
            return ["--js-runtimes", runtime]
    return []


def download_audio(url, dest_dir):
    """Download the best audio stream to dest_dir. Return the file path.

    Uses -f bestaudio with no conversion, so no system ffmpeg is required.
    """
    out_template = os.path.join(dest_dir, "audio.%(ext)s")
    try:
        subprocess.run(
            ["yt-dlp", *js_runtime_args(), "-f", "bestaudio",
             "-o", out_template, url],
            capture_output=True, text=True, check=True,
        )
    except FileNotFoundError:
        print("Error: yt-dlp not found. Install it: pip install yt-dlp", file=sys.stderr)
        return None
    except subprocess.CalledProcessError as e:
        print(f"Error downloading audio: {e.stderr}", file=sys.stderr)
        return None

    files = glob.glob(os.path.join(dest_dir, "audio.*"))
    return files[0] if files else None


def add_cuda_dll_dirs():
    """Make CTranslate2 find cuBLAS/cuDNN from the nvidia-*-cu12 pip packages.

    On Windows the DLLs ship inside site-packages/nvidia/<lib>/bin but are not
    on PATH, so CTranslate2's CUDA backend fails to load them. add_dll_directory
    registers them for the current process. No-op if the packages aren't present.
    """
    if not hasattr(os, "add_dll_directory"):
        return
    for pkg in ("cublas", "cudnn"):
        try:
            mod = __import__(f"nvidia.{pkg}", fromlist=[pkg])
            # nvidia.* are namespace packages: __file__ is None, use __path__.
            for base in (mod.__path__ or []):
                bin_dir = os.path.join(base, "bin")
                if os.path.isdir(bin_dir):
                    os.add_dll_directory(bin_dir)
        except ImportError:
            pass


def resolve_device(requested):
    """Map a requested device to (device, compute_type), detecting CUDA for 'auto'.

    GPU uses int8_float16: fast and low-VRAM, so even large-v3 fits a 4 GB card.
    CPU uses int8.
    """
    if requested in ("auto", "cuda"):
        add_cuda_dll_dirs()
        try:
            import ctranslate2
            if ctranslate2.get_cuda_device_count() > 0:
                return "cuda", "int8_float16"
        except Exception:
            pass
        if requested == "cuda":
            print("Warning: CUDA requested but no GPU detected; using CPU.", file=sys.stderr)
    return "cpu", "int8"


def default_model_for(device):
    """Device-aware default model: large-v3 is GPU-fast but punishingly slow on CPU."""
    return "large-v3" if device == "cuda" else "small"


def format_timestamp(seconds, use_hours):
    """Convert seconds to [MM:SS] or [H:MM:SS]. Matches extract-transcript.py."""
    total_seconds = int(seconds)
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60
    if use_hours:
        return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


def load_model(model_size, device, compute_type, auto_model):
    """Load WhisperModel, falling back to CPU if CUDA init fails.

    On a CUDA->CPU fallback, downgrade an auto-selected model to the CPU
    default so we don't run large-v3 on CPU. An explicit --model is kept.
    """
    from faster_whisper import WhisperModel
    try:
        return WhisperModel(model_size, device=device, compute_type=compute_type), device, model_size
    except Exception as e:
        if device == "cuda":
            fb_model = default_model_for("cpu") if auto_model else model_size
            print(f"Warning: CUDA load failed ({type(e).__name__}); falling back to CPU with model '{fb_model}'.", file=sys.stderr)
            return WhisperModel(fb_model, device="cpu", compute_type="int8"), "cpu", fb_model
        raise


# Priming text biases faster-whisper toward correct spelling of domain proper
# nouns (e.g. "Claude", not "Cloud"). Override with --prompt for a given source.
DEFAULT_PROMPT = (
    "A technical talk about AI and software engineering. Likely terms: "
    "Claude, Claude Code, Anthropic, OpenAI, GPT, LLM, MCP, RAG, agents, "
    "API, Python, TypeScript."
)


def transcribe(audio_path, model_size, device, compute_type, auto_model, initial_prompt):
    """Run faster-whisper on the audio file. Return (transcript, lang) or (None, None)."""
    try:
        model, used_device, used_model = load_model(model_size, device, compute_type, auto_model)
    except ImportError:
        print("Error: faster-whisper not installed. Run: pip install faster-whisper", file=sys.stderr)
        return None, None

    print(f"Loaded model '{used_model}' on {used_device}. Transcribing...", file=sys.stderr)
    segments, info = model.transcribe(audio_path, beam_size=5, initial_prompt=initial_prompt)

    # segments is a generator; collect first so we can decide hour formatting.
    collected = [(seg.start, seg.text.strip()) for seg in segments if seg.text.strip()]
    if not collected:
        return None, None

    use_hours = collected[-1][0] >= 3600
    lines = [f"[{format_timestamp(start, use_hours)}] {text}" for start, text in collected]
    return "\n".join(lines), info.language


def output_result(status, method=None, lang=None, transcript=None):
    """Print JSON result to stdout. Force UTF-8 for transcript characters."""
    sys.stdout.reconfigure(encoding="utf-8")
    print(json.dumps({
        "status": status,
        "extraction_method": method,
        "subtitle_lang": lang,
        "transcript": transcript,
    }, ensure_ascii=False))


def main():
    parser = argparse.ArgumentParser(description="Transcribe a media URL via local faster-whisper.")
    parser.add_argument("url", help="YouTube/podcast/media URL")
    parser.add_argument("--model", default=None,
                        help="faster-whisper model: tiny|base|small|medium|large-v3 "
                             "(default: device-aware — large-v3 on GPU, small on CPU)")
    parser.add_argument("--device", default="auto", choices=["auto", "cuda", "cpu"],
                        help="auto picks CUDA if available, else CPU (default: auto)")
    parser.add_argument("--prompt", default=DEFAULT_PROMPT,
                        help="initial_prompt to bias proper-noun spelling (default: AI-domain terms)")
    args = parser.parse_args()

    device, compute_type = resolve_device(args.device)
    auto_model = args.model is None
    model_size = args.model or default_model_for(device)

    with tempfile.TemporaryDirectory() as tmp:
        audio_path = download_audio(args.url, tmp)
        if not audio_path:
            output_result("error")
            return

        transcript, lang = transcribe(audio_path, model_size, device, compute_type, auto_model, args.prompt)

    if not transcript:
        output_result("error")
        return

    output_result("ok", "whisper-local", lang, transcript)


if __name__ == "__main__":
    main()
