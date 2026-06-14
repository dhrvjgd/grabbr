import Electrobun, { app, BrowserWindow, Updater } from "electrobun/bun";

import { activeDownloadProcesses } from "./lib/procs";
import { cleanupLock, enforceSingleInstance } from "./lib/single-instance";
import { store } from "./lib/store";
import { importWindowsRegistry } from "./lib/windows-registry";
import { rpc } from "./rpc";

const DEV_SERVER_PORT = 5174;
const DEV_SERVER_URL = `http://localhost:${DEV_SERVER_PORT}`;

enforceSingleInstance();
importWindowsRegistry();

const { channel, version } = await Updater.getLocalInfo();
store.set("appVersion", version);

// Check if the web dev server is running for HMR
const getMainViewUrl = async (): Promise<string> => {
  if (channel === "dev") {
    try {
      await fetch(DEV_SERVER_URL, { method: "HEAD" });
      console.log(`HMR enabled: Using web dev server at ${DEV_SERVER_URL}`);
      return DEV_SERVER_URL;
    } catch {
      console.log('Web dev server not running. Run "bun run dev:hmr" for HMR support.');
    }
  }

  return "views://mainview/index.html";
};

const url = await getMainViewUrl();

export const mainWindow = new BrowserWindow({
  title: "Grabbr",
  url,
  rpc,
  frame: {
    width: 1280,
    height: 820,
    x: 120,
    y: 120,
  },
  styleMask: {
    Resizable: false,
  },
});

console.log("Electrobun desktop shell started.");

if (channel !== "dev") {
  if (Updater.updateInfo().updateAvailable) {
    Updater.downloadUpdate();
  }

  mainWindow.webview.on("dom-ready", async () => {
    Updater.onStatusChange((entry) => {
      mainWindow.webview.rpc?.send("updateStatus", entry.status);
    });
  });
}

Electrobun.events.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

Electrobun.events.on("before-quit", () => {
  for (const [, proc] of activeDownloadProcesses) {
    try {
      proc.kill("SIGTERM");
    } catch (error) {
      console.error(error);
    }
  }
  cleanupLock();
});
