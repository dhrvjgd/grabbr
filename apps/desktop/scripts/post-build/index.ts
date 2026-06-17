import { isGithubActions, isWindows } from "../utils";
import { patchIconWindows } from "./patch-icon-windows";
import { replaceBunCanary } from "./replace-bun";

try {
  await replaceBunCanary();

  if (isWindows && isGithubActions) {
    await patchIconWindows();
  }
} catch (error) {
  console.error(error);
}
