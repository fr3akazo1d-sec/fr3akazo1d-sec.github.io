#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

HOST="${1:-0.0.0.0}"
PORT="${2:-4000}"

# Prefer Homebrew Ruby over system Ruby for modern Bundler compatibility.
if [[ -d "/opt/homebrew/opt/ruby@3.3/bin" ]]; then
    export PATH="/opt/homebrew/opt/ruby@3.3/bin:$PATH"
elif [[ -d "/usr/local/opt/ruby@3.3/bin" ]]; then
    export PATH="/usr/local/opt/ruby@3.3/bin:$PATH"
fi

echo "[INFO] Validating _data/*.yml"
ruby scripts/validate_data.rb

LAN_IP="$(ipconfig getifaddr en0 2>/dev/null || ipconfig getifaddr en1 2>/dev/null || true)"
if [[ -n "$LAN_IP" ]]; then
    echo "[INFO] Local URL:   http://127.0.0.1:${PORT}"
    echo "[INFO] Client URL:  http://${LAN_IP}:${PORT}"
fi

if [[ -f Gemfile.lock ]]; then
    REQUIRED_BUNDLER="$(awk '/^BUNDLED WITH/{getline; gsub(/^[[:space:]]+/, ""); print; exit}' Gemfile.lock)"
else
    REQUIRED_BUNDLER=""
fi

if [[ -n "$REQUIRED_BUNDLER" ]]; then
    if bundle _"$REQUIRED_BUNDLER"_ --version >/dev/null 2>&1; then
        echo "[INFO] Using Bundler $REQUIRED_BUNDLER"
        bundle _"$REQUIRED_BUNDLER"_ exec jekyll serve --host "$HOST" --port "$PORT" --livereload
        exit 0
    fi

    echo "[ERROR] Bundler $REQUIRED_BUNDLER is required by Gemfile.lock"
    echo "[INFO] Install it with: gem install bundler:$REQUIRED_BUNDLER"
    echo "[INFO] Then run: bundle _${REQUIRED_BUNDLER}_ install"
    exit 1
fi

echo "[INFO] Bundler version not pinned, using default bundle"
bundle exec jekyll serve --host "$HOST" --port "$PORT" --livereload