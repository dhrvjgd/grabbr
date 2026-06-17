import { mkdir, rm, chmod, copyFile, readdir } from "fs/promises";
import { tmpdir } from "os";
import { dirname, join } from "path";

import { $ } from "bun";

import { appName, BIN_DIR, buildDir, getSystemInfo, type ARCH, type OS } from "../utils";

const BUN_CANARY_BASE = "https://github.com/oven-sh/bun/releases/download/canary";

const BUN_OS: Record<OS, string> = {
  win32: "windows",
  darwin: "darwin",
  linux: "linux",
};

const BUN_ARCH: Record<ARCH, string> = {
  x64: "x64",
  arm64: "aarch64",
};

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

const replaceBun = async (buildBinDir: string, os: OS, arch: ARCH) => {
  const binaryName = os === "win32" ? "bun.exe" : "bun";
  const assetName = `bun-${BUN_OS[os]}-${BUN_ARCH[arch]}`;
  const cachePath = join(BIN_DIR, binaryName);
  const dest = join(buildBinDir, binaryName);

  if (!(await Bun.file(cachePath).exists())) {
    const tmp = join(tmpdir(), `${assetName}.zip`);
    const extractDir = join(tmpdir(), `extract-${assetName}`);

    await mkdir(extractDir, { recursive: true });
    await download(`${BUN_CANARY_BASE}/${assetName}.zip`, tmp);

    try {
      await $`7z x ${tmp} -o${extractDir} -y`;

      const src = await findFile(extractDir, binaryName);
      if (!src) {
        throw new Error(`${binaryName} not found in archive`);
      }

      await mkdir(dirname(dest), { recursive: true });
      await mkdir(BIN_DIR, { recursive: true });
      await copyFile(src, cachePath);
      if (os !== "win32") {
        await chmod(cachePath, 0o755);
      }

      console.log(`Downloaded ${binaryName} to bin cache`);
    } finally {
      await Promise.all([
        rm(tmp, { force: true }),
        rm(extractDir, { recursive: true, force: true }),
      ]);
    }
  } else {
    console.log(`Using cached ${binaryName}`);
  }

  await copyFile(cachePath, dest);
  if (os !== "win32") {
    await chmod(dest, 0o755);
  }

  console.log(`Replaced ${binaryName} with canary`);
};

export const replaceBunCanary = async () => {
  const { os, arch } = getSystemInfo();

  const bunDir = join(buildDir, appName, "bin");

  await replaceBun(bunDir, os, arch);
};
