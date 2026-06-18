import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

import { Utils } from "electrobun/bun";

const lockFile = join(Utils.paths.userData, "single-instance.lock");

const isProcessAlive = (pid: number) => {
  try {
    process.kill(pid, 0);
    return true;
  } catch (error) {
    return (error as any).code === "EPERM";
  }
};

export const cleanupLock = () => {
  try {
    const pid = Number(readFileSync(lockFile, "utf8"));
    if (pid === process.pid) {
      rmSync(lockFile, { force: true });
    }
  } catch {}
};

export const enforceSingleInstance = () => {
  if (existsSync(lockFile)) {
    try {
      const pid = Number(readFileSync(lockFile, "utf8"));
      if (Number.isFinite(pid) && isProcessAlive(pid)) {
        process.exit(0);
      }
    } catch {}
    rmSync(lockFile, { force: true });
  }

  writeFileSync(lockFile, String(process.pid));
};
