import { join } from "path";

import { PATHS } from "electrobun/bun";

const isWindows = process.platform === "win32";

const getBundledBinary = (name: string) => {
  return join(PATHS.RESOURCES_FOLDER, "app.asar.unpacked/bin", name);
};

export const YT_DLP = getBundledBinary(isWindows ? "yt-dlp.exe" : "yt-dlp");
export const FFMPEG = getBundledBinary(isWindows ? "ffmpeg.exe" : "ffmpeg");

console.info(`yt-dlp path: ${YT_DLP}`);
console.info(`ffmpeg path: ${FFMPEG}`);
