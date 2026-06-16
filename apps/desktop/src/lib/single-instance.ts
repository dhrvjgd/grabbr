import { mkdirSync, readFileSync, rmSync, writeFileSync } from "fs";
import { join } from "path";

import { Utils } from "electrobun/bun";

const lockDir = join(Utils.paths.userData, "single-instance.lock");
const pidFile = join(lockDir, "pid");

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
    const pid = Number(readFileSync(pidFile, "utf8"));

    if (pid === process.pid) {
      rmSync(lockDir, { recursive: true, force: true });
    }
  } catch {}
};

export const enforceSingleInstance = () => {
  try {
    // Atomic: only one process can create this directory.
    mkdirSync(lockDir);
    writeFileSync(pidFile, String(process.pid));
  } catch {
    // Someone already created the lock.
    try {
      const pid = Number(readFileSync(pidFile, "utf8"));

      if (Number.isFinite(pid) && isProcessAlive(pid)) {
        process.exit(0);
      }
    } catch {
      // stale/invalid lock; remove and try once more
      rmSync(lockDir, { recursive: true, force: true });
      try {
        mkdirSync(lockDir);
        writeFileSync(pidFile, String(process.pid));
      } catch {
        process.exit(0);
      }
    }
  }

  // Fallbacks for process termination.
  process.on("exit", cleanupLock);
  process.on("SIGINT", () => {
    cleanupLock();
    process.exit(0);
  });
  process.on("SIGTERM", () => {
    cleanupLock();
    process.exit(0);
  });
};
