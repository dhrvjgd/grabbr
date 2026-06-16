import type { AppRPC } from "@grabbr/contracts/rpc";
import { Electroview } from "electrobun/view";

const electroview = new Electroview({
  rpc: Electroview.defineRPC<AppRPC>({
    maxRequestTime: Infinity,
    handlers: {},
  }),
});

if (!electroview.rpc) {
  throw new Error("Failed to create RPC");
}

export const rpc = electroview.rpc;
