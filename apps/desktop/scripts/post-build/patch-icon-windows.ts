import { join, resolve } from "path";

import { $ } from "bun";

import { appName, buildDir } from "../utils";

const ICON = resolve(import.meta.dir, "../../assets/icon.ico");
const BUN_ICON_IDS = ["IDI_MYICON", "1", "2", "3", "4", "5", "6", "7"] as const;
const binDir = join(buildDir, appName, "bin");

const patchExeIcon = async (exePath: string, ids: readonly string[]) => {
  for (const id of ids) {
    await $`bunx resedit --in ${exePath} --out ${exePath} --icon ${`${id},${ICON}`} --ignore-signed`;
  }
};

export const patchIconWindows = async () => {
  await Promise.all([
    patchExeIcon(join(binDir, "launcher.exe"), ["1"]),
    patchExeIcon(join(binDir, "bun.exe"), BUN_ICON_IDS),
  ]);
};
