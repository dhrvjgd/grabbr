export type DownloadCallbacksType = {
  onInit: (payload: { id: string }) => void;
  onStart: (payload: { id: string; name: string }) => void;
  onComplete: (payload: { id: string; name: string; filePath: string }) => void;
  onError: (payload: { id: string; name: string; msg: string }) => void;
  onCancel: (payload: { id: string; name: string }) => void;
};
