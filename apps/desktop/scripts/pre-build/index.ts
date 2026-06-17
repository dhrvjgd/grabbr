import { isGithubActions } from "../utils";
import { downloadBinaries } from "./download-binaries";

const preBuildScript = async () => {
  if (isGithubActions) {
    await downloadBinaries();
  }
};

preBuildScript().catch((error) => {
  console.error("Error: ", error);
  process.exit(1);
});
