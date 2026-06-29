#!/usr/bin/env python3
"""Generate a transcript for a media URL via local ASR (whisper.cpp).

Fallback for sources with NO captions: downloads the audio stream with
yt-dlp, normalizes it to 16 kHz mono with ffmpeg, and transcribes it
locally with the whisper.cpp CLI (`whisper-cli`). Emits the same JSON
contract as extract-transcript.py so callers can treat both interchangeably.

This deliberately reuses the whisper.cpp binary + model already installed on
the machine (the same stack the claude-video-vision plugin uses). It NEVER
installs anything: if whisper-cli, the model, or ffmpeg is missing it returns
status "error" with a manual-install hint on stderr. Do not "fix" a missing
dependency by pip-installing faster-whisper / openai-whisper — that is the
exact duplication this rewrite removes.

Outputs JSON to stdout:
  {"status": "ok", "extraction_method": "whisper-local", "subtitle_lang": "en", "transcript": "..."}
  {"status": "error", "extraction_method": null, "subtitle_lang": null, "transcript": null}

Requires (none auto-installed): yt-dlp, ffmpeg, whisper-cli (brew install whisper-cpp),
and a ggml model under ~/whisper-models/.
"""

import argparse
import glob
import json
import os
import shutil
import subprocess
import sys
import tempfile

MODEL_DIR = os.path.expanduser("~/whisper-models")
VIDEO_VISION_CONFIG = os.path.expanduser("~/.claude-video-vision/config.json")
DEFAULT_MODEL_NAME = "large-v3-turbo"


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

    --remote-components ejs:github pulls yt-dlp's JS challenge solver. Without
    it, current YouTube downloads fail with HTTP 403 (signature solving error),
    which is exactly what bit the old faster-whisper path.
    """
    out_template = os.path.join(dest_dir, "audio.%(ext)s")
    try:
        subprocess.run(
            ["yt-dlp", *js_runtime_args(),
             "--remote-components", "ejs:github",
             "-f", "bestaudio", "-o", out_template, url],
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


def normalize_to_wav(src_path, dest_dir):
    """Convert any audio/video to 16 kHz mono WAV (whisper.cpp's expected input).

    Routing everything through ffmpeg means any container yt-dlp hands back
    works through one code path. Returns the wav path, or None on failure.
    """
    if not shutil.which("ffmpeg"):
        print("Error: ffmpeg not found. Install it: brew install ffmpeg", file=sys.stderr)
        return None
    wav_path = os.path.join(dest_dir, "audio16k.wav")
    try:
        subprocess.run(
            ["ffmpeg", "-nostdin", "-y", "-i", src_path,
             "-ar", "16000", "-ac", "1", "-c:a", "pcm_s16le", wav_path],
            capture_output=True, text=True, check=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"Error normalizing audio: {e.stderr}", file=sys.stderr)
        return None
    return wav_path


def resolve_model(requested):
    """Return the ggml model path, or None if it can't be found.

    Prefer an explicit --model. Otherwise read the model name the
    claude-video-vision plugin is configured to use (so the two stay in sync)
    and fall back to large-v3-turbo. Model files live in ~/whisper-models/.
    """
    if requested and os.path.isabs(requested) and os.path.isfile(requested):
        return requested

    model_name = requested
    if not model_name:
        model_name = DEFAULT_MODEL_NAME
        try:
            with open(VIDEO_VISION_CONFIG) as f:
                model_name = json.load(f).get("whisper_model", DEFAULT_MODEL_NAME)
        except (OSError, json.JSONDecodeError):
            pass

    path = os.path.join(MODEL_DIR, f"ggml-{model_name}.bin")
    if os.path.isfile(path):
        return path
    print(
        f"Error: whisper model not found at {path}\n"
        f"This script does not download models automatically. Fetch it manually, e.g.:\n"
        f"  curl -L -o '{path}' \\\n"
        f"    https://huggingface.co/ggerganov/whisper.cpp/resolve/main/ggml-{model_name}.bin\n"
        f"or pass an absolute --model path to an existing ggml-*.bin.",
        file=sys.stderr,
    )
    return None


def format_timestamp(seconds, use_hours):
    """Convert seconds to [MM:SS] or [H:MM:SS]. Matches extract-transcript.py."""
    total_seconds = int(seconds)
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    secs = total_seconds % 60
    if use_hours:
        return f"{hours}:{minutes:02d}:{secs:02d}"
    return f"{minutes:02d}:{secs:02d}"


# Priming text biases whisper toward correct spelling of domain proper nouns
# (e.g. "Claude", not "Cloud"). Override with --prompt for a given source.
DEFAULT_PROMPT = (
    "A technical talk about AI and software engineering. Likely terms: "
    "Claude, Claude Code, Anthropic, OpenAI, GPT, LLM, MCP, RAG, agents, "
    "API, Python, TypeScript."
)


def transcribe(wav_path, model_path, initial_prompt, dest_dir):
    """Run whisper-cli on the wav, parse its JSON, build timestamped lines.

    Returns (transcript, lang) or (None, None). whisper-cli emits Metal-backed
    inference on Apple Silicon automatically; no device flag is needed.
    """
    whisper_bin = shutil.which("whisper-cli")
    if not whisper_bin:
        print(
            "Error: whisper-cli (whisper.cpp) not found. Install it: brew install whisper-cpp\n"
            "Do not pip install faster-whisper/openai-whisper — this script uses whisper.cpp on purpose.",
            file=sys.stderr,
        )
        return None, None

    out_base = os.path.join(dest_dir, "transcript")
    print(f"Transcribing with {os.path.basename(model_path)} on {whisper_bin} ...", file=sys.stderr)
    try:
        subprocess.run(
            [whisper_bin, "-m", model_path, "-f", wav_path,
             "-l", "auto", "--prompt", initial_prompt, "-np", "-oj", "-of", out_base],
            capture_output=True, text=True, check=True,
        )
    except subprocess.CalledProcessError as e:
        print(f"Error during transcription: {e.stderr}", file=sys.stderr)
        return None, None

    json_path = out_base + ".json"
    try:
        with open(json_path, encoding="utf-8") as f:
            data = json.load(f)
    except (OSError, json.JSONDecodeError) as e:
        print(f"Error reading whisper output: {e}", file=sys.stderr)
        return None, None

    segments = data.get("transcription", [])
    collected = []
    for seg in segments:
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        start_ms = seg.get("offsets", {}).get("from", 0)
        collected.append((start_ms / 1000.0, text))

    if not collected:
        return None, None

    lang = data.get("result", {}).get("language") or "en"
    use_hours = collected[-1][0] >= 3600
    lines = [f"[{format_timestamp(start, use_hours)}] {text}" for start, text in collected]
    return "\n".join(lines), lang


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
    parser = argparse.ArgumentParser(description="Transcribe a media URL via local whisper.cpp.")
    parser.add_argument("url", help="YouTube/podcast/media URL")
    parser.add_argument("--model", default=None,
                        help="ggml model name (e.g. large-v3-turbo, base, small) or an absolute "
                             "path to a ggml-*.bin. Default: read from the claude-video-vision "
                             "config, else large-v3-turbo. Models live in ~/whisper-models/.")
    parser.add_argument("--device", default="auto", choices=["auto", "metal", "cpu"],
                        help="accepted for backward compatibility; whisper.cpp selects the "
                             "backend automatically (Metal on Apple Silicon). Ignored.")
    parser.add_argument("--prompt", default=DEFAULT_PROMPT,
                        help="initial prompt to bias proper-noun spelling (default: AI-domain terms)")
    args = parser.parse_args()

    model_path = resolve_model(args.model)
    if not model_path:
        output_result("error")
        return

    with tempfile.TemporaryDirectory() as tmp:
        audio_path = download_audio(args.url, tmp)
        if not audio_path:
            output_result("error")
            return

        wav_path = normalize_to_wav(audio_path, tmp)
        if not wav_path:
            output_result("error")
            return

        transcript, lang = transcribe(wav_path, model_path, args.prompt, tmp)

    if not transcript:
        output_result("error")
        return

    output_result("ok", "whisper-local", lang, transcript)


if __name__ == "__main__":
    main()
