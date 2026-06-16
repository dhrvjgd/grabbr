import { mainWindow } from "..";

export const downloadCallbacks = {
  onInit: (payload: { id: string }) => mainWindow.webview.rpc?.send("downloadInit", payload),
  onStart: (payload: { id: string; name: string }) =>
    mainWindow.webview.rpc?.send("downloadStart", payload),
  onComplete: (payload: { id: string; name: string; filePath: string }) =>
    mainWindow.webview.rpc?.send("downloadComplete", payload),
  onError: (payload: { id: string; name: string; msg: string }) =>
    mainWindow.webview.rpc?.send("downloadError", payload),
  onCancel: (payload: { id: string; name: string }) =>
    mainWindow.webview.rpc?.send("downloadCancel", payload),
};
