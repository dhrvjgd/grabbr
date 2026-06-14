import type { AppRPC } from "@grabbr/rpc";
import { BrowserView, Updater, Utils } from "electrobun/bun";

import { cancelDownload, startDownload } from "../services/download";
import { clearPreferences, getPreferences, setPreference } from "../services/preferences";
import { getVersion, updateYtdlp } from "../services/update";

export const rpc = BrowserView.defineRPC<AppRPC>({
  maxRequestTime: Infinity,
  handlers: {
    requests: {
      getPreferences: () => getPreferences(),
      setPreference: ({ key, value }) => setPreference(key, value),
      clearPreferences: () => clearPreferences(),
      startDownload: ({ url }) => startDownload(url),
      cancelDownload: ({ id }) => cancelDownload(id),
      ytdlpUpdate: async () => await updateYtdlp(),
      ytdlpVersion: async () => await getVersion(),
      openExternalUrl: ({ url }) => {
        Utils.openExternal(url);
      },
      selectFile: async ({ extensions }) => {
        const paths = await Utils.openFileDialog({
          startingFolder: Utils.paths.home,
          allowedFileTypes: extensions ? extensions.join(",") : "*",
          canChooseFiles: true,
          canChooseDirectory: false,
          allowsMultipleSelection: false,
        });
        return paths?.[0] ?? null;
      },
      selectFolder: async () => {
        const paths = await Utils.openFileDialog({
          startingFolder: Utils.paths.home,
          allowedFileTypes: "*",
          canChooseFiles: false,
          canChooseDirectory: true,
          allowsMultipleSelection: false,
        });
        return paths?.[0] ?? null;
      },
      showItemInFolder: ({ filePath }) => Utils.showItemInFolder(filePath),
      applyUpdate: () => Updater.applyUpdate(),
    },
  },
});
