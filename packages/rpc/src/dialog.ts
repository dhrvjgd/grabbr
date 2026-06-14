export type DialogRequests = {
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
};
