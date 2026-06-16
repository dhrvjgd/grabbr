import { rpc } from "$lib/rpc";
import { toast } from "svelte-sonner";

export const registerUpdaterListeners = () => {
  rpc.addMessageListener("updateStatus", (status) => {
    switch (status) {
      case "update-available": {
        toast.loading("Downloading Update", {
          id: "update",
          position: "bottom-right",
          duration: Infinity,
          dismissible: false,
          description: "Please keep the app open during update",
          descriptionClass: "text-destructive!",
          class: "w-max!",
        });
        break;
      }

      case "download-complete": {
        toast.success("Update is ready", {
          id: "update",
          position: "bottom-right",
          duration: Infinity,
          dismissible: false,
          action: { label: "Install Now", onClick: () => rpc.request.applyUpdate() },
          class: "w-max! text-nowrap",
        });
        break;
      }

      case "error": {
        toast.error("Something went wrong while updating", {
          id: "update",
          duration: Infinity,
          position: "bottom-right",
          closeButton: true,
          description:
            "If restart doesnt fix this error then its recommended to re-install the application",
          descriptionClass: "text-destructive!",
          action: undefined,
        });
        break;
      }
    }
  });
};
