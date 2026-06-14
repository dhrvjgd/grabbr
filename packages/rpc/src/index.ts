import type { RPCSchema } from "electrobun/bun";

import type { DialogRequests } from "./dialog";
import type { DownloadMessages, DownloadRequests } from "./download";
import type { PreferencesRequests } from "./preferences";
import type { UpdaterMessages, UpdaterRequests } from "./updater";
import type { YtdlpRequests } from "./ytdlp";

export type AppRPC = {
  bun: RPCSchema<{
    requests: UpdaterRequests &
      DownloadRequests &
      DialogRequests &
      PreferencesRequests &
      YtdlpRequests;
  }>;
  webview: RPCSchema<{
    messages: UpdaterMessages & DownloadMessages;
  }>;
};
