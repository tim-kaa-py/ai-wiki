#!/usr/bin/env python3
"""Extract YouTube subtitles as timestamped text using yt-dlp.

Outputs JSON to stdout:
  {"status": "ok", "extraction_method": "...", "subtitle_lang": "...", "transcript": "..."}
  {"status": "no_captions", "extraction_method": null, "subtitle_lang": null, "transcript": null}

Requires: yt-dlp (no ffmpeg needed)
"""

import json
import subprocess
import sys
import urllib.request


def get_video_info(url):
    """Run yt-dlp -j and return parsed JSON."""
    try:
        result = subprocess.run(
            ["yt-dlp", "-j", url],
            capture_output=True, text=True, check=True
        )
        return json.loads(result.stdout)
    except FileNotFoundError:
        print("Error: yt-dlp not found. Install it: pip install yt-dlp", file=sys.stderr)
        sys.exit(1)
    except subprocess.CalledProcessError as e:
        print(f"Error running yt-dlp: {e.stderr}", file=sys.stderr)
        sys.exit(1)
    except json.JSONDecodeError:
        print("Error: could not parse yt-dlp output as JSON", file=sys.stderr)
        sys.exit(1)


def find_json3_url(tracks):
    """Find the URL for json3 format in a subtitle track's format list."""
    for track in tracks:
        if track.get("ext") == "json3":
            return track.get("url")
    return None


def find_srv1_url(tracks):
    """Fallback: find the URL for srv1 format."""
    for track in tracks:
        if track.get("ext") == "srv1":
            return track.get("url")
    return None


def get_best_subtitle(info):
    """Select the best subtitle track using a 4-tier priority system.

    Returns (url, extraction_method, lang, format) or (None, None, None, None).
    """
    subs = info.get("subtitles", {})
    auto_subs = info.get("automatic_captions", {})

    priorities = [
        # (source_dict, exact_langs, method_label)
        (subs, ["en", "en-US", "en-GB"], "manual-captions"),
        (subs, None, "manual-captions"),  # any lang starting with "en"
        (auto_subs, ["en", "en-US", "en-GB"], "auto-captions"),
        (auto_subs, None, "auto-captions"),  # any lang starting with "en"
    ]

    for source, exact_langs, method in priorities:
        if exact_langs:
            # Priority 1/3: exact language match
            for lang in exact_langs:
                if lang in source:
                    url = find_json3_url(source[lang])
                    if url:
                        return url, method, lang, "json3"
        else:
            # Priority 2/4: any language starting with "en"
            for lang, tracks in source.items():
                if lang.startswith("en"):
                    url = find_json3_url(tracks)
                    if url:
                        return url, method, lang, "json3"

    # Fallback: try srv1 format with same priority order
    for source, exact_langs, method in priorities:
        if exact_langs:
            for lang in exact_langs:
                if lang in source:
                    url = find_srv1_url(source[lang])
                    if url:
                        return url, method, lang, "srv1"
        else:
            for lang, tracks in source.items():
                if lang.startswith("en"):
                    url = find_srv1_url(tracks)
                    if url:
                        return url, method, lang, "srv1"

    return None, None, None, None


def parse_json3(data, use_hours):
    """Parse json3 subtitle data into timestamped lines."""
    events = data.get("events", [])
    lines = []
    prev_text = None

    for event in events:
        segs = event.get("segs")
        if not segs:
            continue

        text = "".join(seg.get("utf8", "") for seg in segs).strip()
        if not text:
            continue

        # Deduplicate consecutive identical lines
        if text == prev_text:
            continue
        prev_text = text

        start_ms = event.get("tStartMs", 0)
        timestamp = format_timestamp(start_ms, use_hours)
        lines.append(f"[{timestamp}] {text}")

    return "\n".join(lines)


def parse_srv1(data, use_hours):
    """Parse srv1 (XML) subtitle data into timestamped lines."""
    import xml.etree.ElementTree as ET
    root = ET.fromstring(data)
    lines = []
    prev_text = None

    for text_elem in root.findall(".//text"):
        text = (text_elem.text or "").strip()
        if not text:
            continue
        if text == prev_text:
            continue
        prev_text = text

        start_sec = float(text_elem.get("start", 0))
        start_ms = int(start_sec * 1000)
        timestamp = format_timestamp(start_ms, use_hours)
        lines.append(f"[{timestamp}] {text}")

    return "\n".join(lines)


def format_timestamp(ms, use_hours):
    """Convert milliseconds to [MM:SS] or [H:MM:SS]."""
    total_seconds = ms // 1000
    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    if use_hours:
        return f"{hours}:{minutes:02d}:{seconds:02d}"
    return f"{minutes:02d}:{seconds:02d}"


def output_result(status, method=None, lang=None, transcript=None):
    """Print JSON result to stdout."""
    print(json.dumps({
        "status": status,
        "extraction_method": method,
        "subtitle_lang": lang,
        "transcript": transcript,
    }, ensure_ascii=False))


def main():
    if len(sys.argv) != 2:
        print(f"Usage: python {sys.argv[0]} <youtube-url>", file=sys.stderr)
        sys.exit(1)

    url = sys.argv[1]

    # Get video metadata
    info = get_video_info(url)
    duration = info.get("duration", 0) or 0
    use_hours = duration >= 3600

    # Find best subtitle track
    sub_url, method, lang, fmt = get_best_subtitle(info)

    if not sub_url:
        output_result("no_captions")
        return

    # Download subtitle data
    try:
        with urllib.request.urlopen(sub_url) as response:
            raw = response.read().decode("utf-8")
    except Exception as e:
        print(f"Error downloading subtitles: {e}", file=sys.stderr)
        output_result("no_captions")
        return

    # Parse into timestamped text
    if fmt == "json3":
        data = json.loads(raw)
        transcript = parse_json3(data, use_hours)
    elif fmt == "srv1":
        transcript = parse_srv1(raw, use_hours)
    else:
        output_result("no_captions")
        return

    if not transcript:
        output_result("no_captions")
        return

    output_result("ok", method, lang, transcript)


if __name__ == "__main__":
    main()
