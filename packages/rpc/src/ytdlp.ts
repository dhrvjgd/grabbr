export type YtdlpRequests = {
  ytdlpUpdate: {
    params: void;
    response: Promise<{ alreadyLatest: boolean; version: string }>;
  };

  ytdlpVersion: {
    params: void;
    response: Promise<string>;
  };
};
