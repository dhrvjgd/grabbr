import { isGithubActions, isWindows } from "../utils";
import { patchIconWindows } from "./patch-icon-windows";

const postPackageScript = async () => {
  if (isWindows && isGithubActions) {
    await patchIconWindows();
  }
};

postPackageScript().catch((error) => {
  console.error("Error: ", error);
  process.exit(1);
});
