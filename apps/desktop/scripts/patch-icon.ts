import fs from "fs/promises";
import path from "path";

import { $ } from "bun";

const ICON = path.resolve(import.meta.dir, "../assets/icon.ico");
const OUT = path.resolve(import.meta.dir, "../artifacts");
const APP_NAME = "Grabbr";
const BUN_ICON_IDS = ["IDI_MYICON", "1", "2", "3", "4", "5", "6", "7"] as const;

async function findFirst(dir: string, match: (name: string) => boolean): Promise<string | null> {
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const hit = await findFirst(full, match);
      if (hit) return hit;
    } else if (match(entry.name)) {
      return full;
    }
  }
  return null;
}

async function patchExeIcon(exePath: string, ids: readonly string[]) {
  for (const id of ids) {
    await $`bunx resedit --in ${exePath} --out ${exePath} --icon ${`${id},${ICON}`} --ignore-signed`;
  }
}

const main = async () => {
  if (process.platform !== "win32") return;

  // Git ships tar + zstd on Windows
  Bun.env.PATH = `C:\\Program Files\\Git\\usr\\bin;${process.env.PATH ?? ""}`;

  const zipName = (await fs.readdir(OUT)).find((f) => f.endsWith("Setup.zip"));
  if (!zipName) throw new Error(`No *Setup.zip found in ${OUT}`);

  const zipPath = path.join(OUT, zipName);
  const zipTmp = path.join(OUT, ".zip-tmp");
  const innerTmp = path.join(OUT, ".inner-tmp");

  try {
    await fs.mkdir(zipTmp, { recursive: true });
    await $`7z x ${zipPath} -o${zipTmp} -y`;

    // ── Patch NSIS installer EXE ─────────────────────────────────────────────
    const setupExe = await findFirst(zipTmp, (n) => n === `${APP_NAME}-Setup.exe`);
    if (!setupExe) throw new Error(`${APP_NAME}-Setup.exe not found`);
    await patchExeIcon(setupExe, ["1"]);

    // ── Unpack embedded app archive ──────────────────────────────────────────
    const innerZst = await findFirst(zipTmp, (n) => n.endsWith(".tar.zst"));
    if (!innerZst) throw new Error("No *.tar.zst found inside setup zip");

    const innerTar = path.join(OUT, ".inner.tar");
    await fs.mkdir(innerTmp, { recursive: true });

    try {
      await $`zstd -d ${innerZst} -o ${innerTar} -f`;

      const rootDir = (await $`tar -tf ${innerTar}`.text())
        .split(/\r?\n/)
        .find(Boolean)!
        .replace(/^\.\/+/, "")
        .split("/")[0];

      await $`tar -xf ${innerTar} -C ${innerTmp}`;

      // ── Patch launcher.exe ───────────────────────────────────────────────
      const launcher = await findFirst(innerTmp, (n) => n === "launcher.exe");
      if (!launcher) throw new Error("launcher.exe not found");
      await patchExeIcon(launcher, ["1"]);

      // ── Patch bun.exe (all resource IDs) ────────────────────────────────
      const bunExe = await findFirst(innerTmp, (n) => n === "bun.exe");
      if (!bunExe) throw new Error("bun.exe not found");
      await patchExeIcon(bunExe, BUN_ICON_IDS);

      // ── Repack ───────────────────────────────────────────────────────────
      await $`tar -cf ${innerTar} -C ${innerTmp} ${rootDir}`;
      await $`zstd -T0 ${innerTar} -o ${innerZst} -f`;
    } finally {
      await fs.rm(innerTar, { force: true });
      await fs.rm(innerTmp, { recursive: true, force: true });
    }

    // ── Rebuild ZIP ──────────────────────────────────────────────────────────
    await fs.unlink(zipPath);
    await $`7z a -tzip ${zipPath} ${path.join(zipTmp, "*")}`;
  } finally {
    await fs.rm(zipTmp, { recursive: true, force: true });
  }
};

main().catch((err) => {
  console.error("Error: ", err.message);
  process.exit(1);
});
