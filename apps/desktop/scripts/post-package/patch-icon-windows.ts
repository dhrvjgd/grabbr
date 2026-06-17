import fs from "fs/promises";
import { resolve, join } from "path";

import { $ } from "bun";

import { artifactDir } from "../utils";

// Git ships tar + zstd on Windows
Bun.env.PATH = `C:\\Program Files\\Git\\usr\\bin;${process.env.PATH ?? ""}`;

const ICON = resolve(import.meta.dir, "../../assets/icon.ico");
const APP_NAME = "Grabbr";

export const patchIconWindows = async () => {
  const zipName = (await fs.readdir(artifactDir)).find((f) => f.endsWith("Setup.zip"));
  if (!zipName) {
    throw new Error(`No *Setup.zip in ${artifactDir}`);
  }

  const zipPath = join(artifactDir, zipName);
  const zipTmp = join(artifactDir, ".zip-tmp");

  try {
    await fs.mkdir(zipTmp, { recursive: true });
    await $`7z x ${zipPath} -o${zipTmp} -y`;

    const setupExe = join(zipTmp, `${APP_NAME}-Setup.exe`);
    await $`bunx resedit --in ${setupExe} --out ${setupExe} --icon ${"1," + ICON} --ignore-signed`;

    await fs.unlink(zipPath);
    await $`7z a -tzip ${zipPath} ${join(zipTmp, "*")}`;
  } finally {
    await fs.rm(zipTmp, { recursive: true, force: true });
  }
};
