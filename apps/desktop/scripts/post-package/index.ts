import { isGithubActions, isWindows } from "../utils";
import { patchIconWindows } from "./patch-icon-windows";

try {
  if (isWindows && isGithubActions) {
    await patchIconWindows();
  }
} catch (error) {
  console.error("Post-package script error: ", error);
}
