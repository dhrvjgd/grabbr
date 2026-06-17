import { mkdir, rm, chmod, copyFile, readdir } from "fs/promises";
import { tmpdir } from "os";
import { join } from "path";

import { $ } from "bun";

import { BIN_DIR, getSystemInfo, type ARCH, type OS } from "../utils";

const download = async (url: string, dest: string) => {
  console.log(`Downloading ${url}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to download ${url} (${res.status})`);
  }

  const bytes = await res.bytes();
  await Bun.write(dest, bytes);

  console.log(`Downloaded ${url}`);
};

const findFile = async (dir: string, name: string): Promise<string | null> => {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      const hit = await findFile(full, name);
      if (hit) {
        return hit;
      }
    } else if (entry.name === name) {
      return full;
    }
  }
  return null;
};
const extractBinaries = async (archive: string, names: string[], isZip: boolean, os: OS) => {
  // Use name-based suffix so parallel extractions never collide
  const extractDir = join(tmpdir(), `extract-${names[0]}`);
  await mkdir(extractDir, { recursive: true });

  try {
    if (isZip) {
      await $`7z x ${archive} -o${extractDir} -y`;
    } else {
      await $`tar -xf ${archive} -C ${extractDir}`;
    }

    await Promise.all(
      names.map(async (name) => {
        console.log(`Extracting ${name}`);

        const src = await findFile(extractDir, name);
        if (!src) {
          throw new Error(`${name} not found in archive`);
        }

        const dest = join(BIN_DIR, name);

        await copyFile(src, dest);

        if (os !== "win32") {
          await chmod(dest, 0o755);
        }

        console.log(`Extracted ${name}`);
      }),
    );
  } finally {
    await Promise.all([
      rm(archive, { force: true }),
      rm(extractDir, { recursive: true, force: true }),
    ]);
  }
};

const downloadYtDlp = async (os: OS, a: ARCH) => {
  const urls: Record<OS, Record<ARCH, string>> = {
    win32: {
      x64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe",
      arm64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp.exe",
    },
    darwin: {
      x64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos",
      arm64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_macos",
    },
    linux: {
      x64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux",
      arm64: "https://github.com/yt-dlp/yt-dlp/releases/latest/download/yt-dlp_linux_aarch64",
    },
  };

  const filenames: Record<OS, string> = {
    win32: "yt-dlp.exe",
    darwin: "yt-dlp",
    linux: "yt-dlp",
  };

  const dest = join(BIN_DIR, filenames[os]);

  await download(urls[os][a], dest);

  if (os !== "win32") {
    await chmod(dest, 0o755);
  }
};

const downloadFFmpeg = async (os: OS, a: ARCH): Promise<void> => {
  if (os === "win32") {
    const urls: Record<ARCH, string> = {
      x64: "https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-win64-gpl.zip",
      arm64:
        "https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-winarm64-gpl.zip",
    };

    const tmp = join(tmpdir(), "ffmpeg.zip");

    await download(urls[a], tmp);

    await extractBinaries(tmp, ["ffmpeg.exe", "ffprobe.exe"], true, os);
  } else if (os === "linux") {
    const urls: Record<ARCH, string> = {
      x64: "https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linux64-gpl.tar.xz",
      arm64:
        "https://github.com/yt-dlp/FFmpeg-Builds/releases/download/latest/ffmpeg-master-latest-linuxarm64-gpl.tar.xz",
    };

    const tmp = join(tmpdir(), "ffmpeg.tar.xz");

    await download(urls[a], tmp);

    await extractBinaries(tmp, ["ffmpeg", "ffprobe"], false, os);
  } else {
    await Promise.all(
      [
        { name: "ffmpeg", url: "https://evermeet.cx/ffmpeg/getrelease/zip" },
        { name: "ffprobe", url: "https://evermeet.cx/ffmpeg/getrelease/ffprobe/zip" },
      ].map(async ({ name, url }) => {
        const tmp = join(tmpdir(), `${name}.zip`);

        await download(url, tmp);

        await extractBinaries(tmp, [name], true, os);
      }),
    );
  }
};

export const downloadBinaries = async () => {
  const { os, arch } = getSystemInfo();

  await rm(BIN_DIR, { recursive: true, force: true });
  await mkdir(BIN_DIR, { recursive: true });

  await Promise.all([downloadYtDlp(os, arch), downloadFFmpeg(os, arch)]);

  console.log("All binaries downloaded into", BIN_DIR);
};
