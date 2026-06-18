import { isGithubActions } from "../utils";
import { downloadBinaries } from "./download-binaries";

try {
  if (isGithubActions) {
    await downloadBinaries();
  }
} catch (error) {
  console.error("Pre-build script error: ", error);
}
