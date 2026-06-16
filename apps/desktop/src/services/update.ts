import { exec } from "child_process";

import { YT_DLP } from "../lib/binary-paths";

export const updateYtdlp = (): Promise<{ alreadyLatest: boolean; version: string }> => {
  console.info("Starting yt-dlp update...");

  return new Promise((resolve, reject) => {
    exec(
      `"${YT_DLP}" --update`,
      { encoding: "utf-8", windowsHide: true },
      async (error, stdout, stderr) => {
        if (error) {
          console.error(error);

          return reject(error);
        }
        if (stderr) {
          console.error(`ytdlp stderr: ${stderr}`);

          return reject(new Error(stderr));
        }

        const alreadyLatest = /is up to date/i.test(stdout);
        const version = await getVersion();

        resolve({ alreadyLatest, version });
      },
    );
  });
};

export const getVersion = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    exec(
      `"${YT_DLP}" --version`,
      { encoding: "utf-8", windowsHide: true },
      (error, stdout, stderr) => {
        if (error) {
          console.error(error);

          return reject(error);
        }
        if (stderr) {
          console.error(`ytdlp stderr: ${stderr}`);

          return reject(new Error(stderr));
        }

        resolve(stdout);
      },
    );
  });
};
