import type { DownloadCallbacksType } from "@grabbr/contracts/types";

import { mainWindow } from "..";

export const downloadCallbacks: DownloadCallbacksType = {
  onInit: (payload) => mainWindow.webview.rpc?.send("downloadInit", payload),
  onStart: (payload) => mainWindow.webview.rpc?.send("downloadStart", payload),
  onComplete: (payload) => mainWindow.webview.rpc?.send("downloadComplete", payload),
  onError: (payload) => mainWindow.webview.rpc?.send("downloadError", payload),
  onCancel: (payload) => mainWindow.webview.rpc?.send("downloadCancel", payload),
};
