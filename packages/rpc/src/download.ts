export type DownloadRequests = {
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
};

export type DownloadMessages = {
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
