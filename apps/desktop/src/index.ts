import { BrowserWindow, Updater } from "electrobun/bun";

import { enforceSingleInstance } from "./lib/single-instance";
import { store } from "./lib/store";
import { rpc } from "./rpc";

enforceSingleInstance();

const { channel, version } = await Updater.getLocalInfo();
store.set("appVersion", version);

export const mainWindow = new BrowserWindow({
  title: "Grabbr",
  url: channel === "dev" ? "http://localhost:5174" : "views://mainview/index.html",
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

if (channel !== "dev") {
  mainWindow.webview.on("dom-ready", async () => {
    Updater.onStatusChange((entry) => {
      mainWindow.webview.rpc?.send("updateStatus", entry.status);
    });

    const { updateAvailable, error } = await Updater.checkForUpdate();
    if (error) {
      console.error("Update Error: ", error);
    }
    if (updateAvailable) {
      Updater.downloadUpdate();
    }
  });
}

// Electrobun.events.on("before-quit", () => {
//   cleanupDownloadProcesses();
//   closeDb();
//   cleanupLock();
// });
