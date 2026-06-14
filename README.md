# grabbr

> Desktop multimedia downloader for YouTube and Instagram — powered by
> yt-dlp and FFmpeg.

Grabbr is a cross-platform desktop application that downloads audio and
video from supported URLs. It wraps `yt-dlp` and `FFmpeg` in a clean
Svelte UI, with saved preferences, GPU-accelerated encoding, and
auto-updates.

![Grabbr](.github/screenshot.png)

## Features

- Audio and video download modes with persistent preferences
- Audio presets for FLAC, ALAC, WAV, OPUS, M4A, MP3, and VORBIS
- Video presets with resolution from 144p to 4320p, MP4 or MKV output
- Codec sorting to prefer H.264 or H.265 sources
- Optional post-download re-encoding with configurable encoder and codec
- GPU vendor detection (NVIDIA, AMD, Intel) for hardware encoding
- Metadata and chapter embedding
- Ask-every-time or saved download folder
- System, light, and dark themes
- In-app yt-dlp version checking and updating
- App auto-updates via Electrobun
- Experimental cookies.txt support for rate-limited downloads

## Tech Stack

| Layer         | Technology                                                                                |
| ------------- | ----------------------------------------------------------------------------------------- |
| Desktop shell | [Electrobun](https://github.com/Electrobun/electrobun)                                    |
| Renderer      | [Svelte 5](https://svelte.dev/) (runes mode)                                              |
| UI toolkit    | [shadcn-svelte](https://shadcn-svelte.com/) + [Tailwind CSS v4](https://tailwindcss.com/) |
| Runtime       | [Bun](https://bun.sh/)                                                                    |
| Monorepo      | [Turborepo](https://turbo.build/)                                                         |
| Persistence   | SQLite via `bun:sqlite`                                                                   |
| Media engine  | [yt-dlp](https://github.com/yt-dlp/yt-dlp) + [FFmpeg](https://ffmpeg.org/)                |
| Linting       | Oxlint + Oxfmt                                                                            |
| Git hooks     | Lefthook                                                                                  |

## Project Structure

```text
grabbr/
├── apps/
│   ├── desktop/         # Electrobun main process (Bun entry, RPC handlers, yt-dlp/FFmpeg)
│   └── ui/              # Svelte 5 SPA (renderer)
├── packages/
│   ├── config/           # Shared tsconfig
│   ├── contracts/        # Shared enums, types, URL validation
│   └── rpc/              # RPC type definitions for UI ↔ Desktop IPC
├── scripts/
├── turbo.json
└── package.json
```

## Prerequisites

- [Bun](https://bun.sh/) 1.3+
- Windows, macOS, or Linux

## Getting Started

```bash
# Install dependencies
bun install

# Download yt-dlp, ffmpeg, and ffprobe binaries
bun run scripts:bin

# Start development (UI + desktop)
bun run dev
```

Then open the desktop app directly (it will connect to Vite's HMR on port 5174).

## Available Scripts

| Script                         | Description                                       |
| ------------------------------ | ------------------------------------------------- |
| `bun run dev`                  | Start all apps in development mode                |
| `bun run build`                | Build all apps                                    |
| `bun run dev:ui`               | Start only the UI dev server                      |
| `bun run dev:desktop`          | Start only the desktop app in watch mode          |
| `bun run build:ui`             | Build only the UI                                 |
| `bun run build:desktop`        | Build the desktop app (stable variant)            |
| `bun run build:desktop:canary` | Build the desktop app (canary variant)            |
| `bun run check-types`          | TypeScript type-checking across the monorepo      |
| `bun run check`                | Lint and format with Oxlint + Oxfmt               |
| `bun run clean`                | Remove node_modules, build artifacts              |
| `bun run scripts:bin`          | Download media binaries (yt-dlp, ffmpeg, ffprobe) |

## Download Options

- **Audio** — Best or Custom presets with format, quality, metadata, and
  chapter controls
- **Video** — Best or Custom presets with resolution, container, and
  metadata controls
- **Sorting** — Prefer H.264 or H.265 formats before quality-based
  selection
- **Encoding** — Optional post-download re-encoding with configurable
  encoder, codec, speed, and CRF
- **General** — Theme switching, download folder mode, reset saved
  options
- **Updates** — View and update yt-dlp version from the app
- **Experimental** — Select a cookies.txt file for rate-limited sessions
  (deleted after use)

## Architecture

```text
┌───────────────────────────────────────────────────────────┐
│                     Desktop Process                       │
│  ┌─────────────┐     ┌──────────────┐                     │
│  │  Browser-   │────▶│  Main Entry  │                     │
│  │   Window    │     │  (index.ts)  │                     │
│  │  (WebView)  │     │              │                     │
│  │             │◀────│     RPC      │                     │
│  │  Svelte 5   │     │   Handlers   │                     │
│  │    SPA      │     │              │                     │
│  └─────────────┘     │ ┌──────────┐ │                     │
│        │             │ │ Services │ │                     │
│        │ RPC         │ │ - yt-dlp │ │──▶ yt-dlp/FFmpeg    │
│        │ messages    │ │ - SQLite │ │──▶ preferences.db   │
│        │             │ │ - Update │ │──▶ auto-updater     │
│        ▼             │ └──────────┘ │                     │
│   ┌──────────┐       └──────────────┘                     │
│   │ Toasts / │                                            │
│   │ Status   │                                            │
│   └──────────┘                                            │
└───────────────────────────────────────────────────────────┘
```

The Svelte 5 renderer communicates with the Bun main process exclusively
through **Electrobun's typed RPC** (request/response + unidirectional
messages). Preferences are stored in SQLite via `bun:sqlite` with an
in-memory read cache. Downloads are managed as child processes of
`yt-dlp`, with progress forwarded to the UI as RPC messages.

## Build & Package

```bash
# Production build (UI → desktop bundle)
bun run build:desktop

# Canary build
bun run build:desktop:canary

# Platform-specific packages (via electrobun)
# Configured in apps/desktop/electrobun.config.ts
```

Built packages are output to `apps/desktop/build/`.

## Releases

GitHub Actions builds draft releases when version tags matching
`v*.*.*` are pushed. Release artifacts are published for Windows, macOS,
and Linux.
