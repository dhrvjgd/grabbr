import { spawn } from "child_process";
import fs from "fs";

import { isValidUrl } from "@grabbr/shared/utils";

import { downloadCallbacks } from "../callbacks/download";
import { buildArgs } from "../lib/args";
import { YT_DLP } from "../lib/binary-paths";
import { activeDownloadProcesses, cancelledDownloads } from "../lib/procs";
import { store } from "../lib/store";

export const startDownload = (url: string) => {
  // Generate an unique ID for download
  const id = crypto.randomUUID();

  // Validate URL
  if (!isValidUrl(url)) {
    downloadCallbacks.onError({ id, name: "Invalid URL", msg: url });
    return;
  }

  // Validate cookies file
  const cookiesFilePath = store.get("base.filesystem.cookies");
  if (cookiesFilePath && !fs.existsSync(cookiesFilePath)) {
    downloadCallbacks.onError({ id, name: "Cookies file not found", msg: url });
    return;
  }

  // Initialize
  downloadCallbacks.onInit({ id });

  // Build Args
  const args = buildArgs(url);

  // Spawn yt-dlp
  const proc = spawn(YT_DLP, args, { windowsHide: true });

  // Add this process to active download processes
  activeDownloadProcesses.set(id, proc);

  const cleanup = (): void => {
    activeDownloadProcesses.delete(id);
    cancelledDownloads.delete(id);
  };

  let filePath = "";
  let name = "";

  // Start download
  let nameReceived = false;
  proc.stdout.on("data", (chunk: Buffer) => {
    const line = chunk.toString().split("\n", 1)[0]?.trim();
    if (!line) return;

    console.debug(`ytdlp stdout: ${line}`);

    if (!nameReceived) {
      nameReceived = true;
      name = line;
      downloadCallbacks.onStart({ id, name });
    } else {
      filePath = line;
    }
  });

  // Error in download
  proc.stderr.on("data", (chunk: Buffer) => {
    console.error(`ytdlp stderr: ${chunk.toString()}`);
  });

  // Download completed (with or without error) or cancelled
  proc.on("close", (code) => {
    if (cancelledDownloads.has(id)) {
      console.info(`Download Cancelled: ${name}`);

      cleanup();
      downloadCallbacks.onCancel({ id, name });
      return;
    }

    if (code === 0) {
      console.info(`Download completed: ${name}`);

      cleanup();
      downloadCallbacks.onComplete({ id, name, filePath });
    } else {
      console.error(`yt-dlp exited with code: ${code}`);

      cleanup();
      downloadCallbacks.onError({ id, name, msg: "Something went wrong" });
    }

    if (cookiesFilePath && fs.existsSync(cookiesFilePath)) {
      fs.rmSync(cookiesFilePath, { force: true });
    }
  });

  // Error in yt-dlp
  proc.on("error", (error) => {
    console.error(`yt-dlp process error: ${error.message}`);

    cleanup();
    downloadCallbacks.onError({ id, name, msg: error.message });
  });
};

export const cancelDownload = (id: string) => {
  const proc = activeDownloadProcesses.get(id);
  if (!proc) return;

  cancelledDownloads.add(id);

  try {
    if (process.platform === "win32") {
      spawn("taskkill", ["/pid", proc.pid!.toString(), "/T", "/F"]);
    } else {
      proc.kill();
    }
  } catch (error) {
    console.error(`Error killing ytdlp process: ${error}`);
  }
};
