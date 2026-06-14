import type { UpdateStatusType } from "electrobun/bun";

export type UpdaterRequests = {
  applyUpdate: {
    params: void;
    response: void;
  };
};

export type UpdaterMessages = {
  updateStatus: UpdateStatusType;
};
