import { rpc } from "$lib/rpc";
import { toast } from "svelte-sonner";

export const registerDownloadListeners = () => {
  rpc.addMessageListener("downloadInit", ({ id }) => {
    toast.loading("Initializing Download...", {
      id: `download-${id}`,
      position: "top-right",
      duration: Infinity,
      dismissible: false,
    });
  });

  rpc.addMessageListener("downloadStart", ({ id, name }) => {
    const finalName = name.length > 50 ? `${name.slice(0, 50)}...` : name;
    toast.loading(finalName, {
      id: `download-${id}`,
      position: "top-right",
      duration: Infinity,
      dismissible: false,
      description: "Downloading...",
      descriptionClass: "text-muted-foreground!",
      action: {
        label: "Cancel",
        onClick: () => {
          toast.loading(finalName, {
            id: `download-${id}`,
            position: "top-right",
            duration: Infinity,
            dismissible: false,
            description: "Cancelling...",
            action: undefined,
          });
          rpc.request.cancelDownload({ id });
        },
      },
    });
  });

  rpc.addMessageListener("downloadComplete", ({ id, name, filePath }) => {
    const finalName = name.length > 50 ? `${name.slice(0, 50)}...` : name;
    toast.success(finalName, {
      id: `download-${id}`,
      position: "top-right",
      description: "Download Completed",
      descriptionClass: "text-muted-foreground!",
      dismissible: true,
      duration: 8000,
      closeButton: true,
      action: {
        label: "Show in Folder",
        onClick: () => rpc.request.showItemInFolder({ filePath }),
      },
      cancel: undefined,
    });
  });

  rpc.addMessageListener("downloadError", ({ id, name, msg }) => {
    toast.error(name, {
      id: `download-${id}`,
      position: "top-right",
      dismissible: true,
      duration: Infinity,
      description: msg,
      descriptionClass: "text-destructive!",
      action: undefined,
      cancel: undefined,
      closeButton: true,
      richColors: true,
    });
  });

  rpc.addMessageListener("downloadCancel", ({ id, name }) => {
    toast.success(name, {
      id: `download-${id}`,
      position: "top-right",
      dismissible: true,
      duration: 8000,
      description: "Cancelled",
      descriptionClass: "text-muted-foreground!",
      action: undefined,
      richColors: false,
    });
  });
};
