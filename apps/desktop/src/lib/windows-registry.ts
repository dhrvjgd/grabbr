import { existsSync } from "fs";
import { join } from "path";

import { Utils } from "electrobun/bun";

export const importWindowsRegistry = () => {
  if (process.platform === "win32") {
    const regFile = join(Utils.paths.userData, "app", "Grabbr_uninstall.reg");
    if (existsSync(regFile)) {
      Bun.spawnSync(["reg", "import", regFile], {
        stdin: "ignore",
        stdout: "ignore",
        stderr: "ignore",
      });
    }
  }
};
