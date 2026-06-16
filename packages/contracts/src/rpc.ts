import type { PreferenceMap, Preferences } from "@grabbr/shared/preferences";
import type { RPCSchema, UpdateStatusType } from "electrobun/bun";

export type AppRPC = {
  bun: RPCSchema<{
    requests: {
      applyUpdate: {
        params: void;
        response: void;
      };

      startDownload: {
        params: {
          url: string;
        };
        response: void;
      };
      cancelDownload: {
        params: {
          id: string;
        };
        response: void;
      };

      selectFolder: {
        params: void;
        response: string | null;
      };
      selectFile: {
        params: {
          name?: string;
          extensions?: string[];
        };
        response: string | null;
      };
      showItemInFolder: {
        params: {
          filePath: string;
        };
        response: void;
      };
      openExternalUrl: {
        params: {
          url: string;
        };
        response: void;
      };

      getPreferences: {
        params: void;
        response: Preferences;
      };
      setPreference: {
        params: {
          key: keyof PreferenceMap;
          value: PreferenceMap[keyof PreferenceMap];
        };
        response: void;
      };
      clearPreferences: {
        params: void;
        response: void;
      };

      ytdlpUpdate: {
        params: void;
        response: Promise<{ alreadyLatest: boolean; version: string }>;
      };
      ytdlpVersion: {
        params: void;
        response: Promise<string>;
      };
    };
  }>;
  webview: RPCSchema<{
    messages: {
      updateStatus: UpdateStatusType;

      downloadInit: {
        id: string;
      };
      downloadStart: {
        id: string;
        name: string;
      };
      downloadComplete: {
        id: string;
        name: string;
        filePath: string;
      };
      downloadError: {
        id: string;
        name: string;
        msg: string;
      };
      downloadCancel: {
        id: string;
        name: string;
      };
    };
  }>;
};
