import { registerDownloadListeners } from "./download";
import { registerUpdaterListeners } from "./updater";

export const registerListeners = () => {
  registerDownloadListeners();
  registerUpdaterListeners();
};
