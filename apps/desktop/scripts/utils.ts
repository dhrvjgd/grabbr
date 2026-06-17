export type OS = "win32" | "darwin" | "linux";
export type ARCH = "x64" | "arm64";

export const getSystemInfo = () => {
  const os = process.platform;
  if (!["win32", "darwin", "linux"].includes(os)) {
    throw new Error(`Unsupported OS: ${os}`);
  }
  const arch = process.arch;
  return { os: os as OS, arch: arch as ARCH };
};

export const isWindows = process.platform === "win32";
export const isGithubActions = Bun.env.GITHUB_ACTIONS === "true";

export const BIN_DIR = "bin";
export const buildDir = process.env.ELECTROBUN_BUILD_DIR!;
export const appName = process.env.ELECTROBUN_APP_NAME!;
export const artifactDir = process.env.ELECTROBUN_ARTIFACT_DIR!;
