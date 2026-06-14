import { FFmpegEncoderEnum } from "@grabbr/contracts/enums";

import { store } from "./store";

const VENDOR_MAP: Record<number, FFmpegEncoderEnum> = {
  0x10de: FFmpegEncoderEnum.NVIDIA,
  0x1002: FFmpegEncoderEnum.AMD,
  0x8086: FFmpegEncoderEnum.INTEL,
};

const getGPUVendorIds = async (): Promise<number[]> => {
  try {
    switch (process.platform) {
      case "linux": {
        const proc = Bun.spawn(["lspci", "-n"], { stdout: "pipe" });
        const output = await new Response(proc.stdout).text();
        // lspci -n output: "00:02.0 0300: 8086:1234" — grab vendor from VGA/3D lines
        return output
          .split("\n")
          .filter((l) => l.includes("0300") || l.includes("0302"))
          .map((l) => parseInt(l.split(":")[2]?.trim() ?? "", 16))
          .filter((v) => !isNaN(v));
      }
      case "win32": {
        const proc = Bun.spawn(["wmic", "path", "win32_videocontroller", "get", "PNPDeviceID"], {
          stdout: "pipe",
        });
        const output = await new Response(proc.stdout).text();
        // PNPDeviceID looks like: PCI\VEN_10DE&DEV_...
        return output
          .split("\n")
          .map((l) => parseInt(l.match(/VEN_([0-9A-Fa-f]{4})/)?.[1] ?? "", 16))
          .filter((v) => !isNaN(v));
      }
      case "darwin": {
        const proc = Bun.spawn(["system_profiler", "SPDisplaysDataType", "-json"], {
          stdout: "pipe",
        });
        const output = await new Response(proc.stdout).text();
        const json = JSON.parse(output);
        const displays = json?.SPDisplaysDataType ?? [];
        // vendor_id looks like "0x1002"
        return displays
          .map((d: any) => parseInt(d.spdisplays_vendor_id ?? "", 16))
          .filter((v: number) => !isNaN(v));
      }
      default:
        return [];
    }
  } catch {
    return [];
  }
};

export const ensureSupportedEncoders = async () => {
  const supportedEncoders = store.get("supportedEncoders");
  if (supportedEncoders.length > 1) return;

  const vendorIds = await getGPUVendorIds();
  const vendors = vendorIds
    .map((id) => VENDOR_MAP[id] ?? null)
    .filter((v, i, arr): v is FFmpegEncoderEnum => v !== null && arr.indexOf(v) === i);

  store.set("supportedEncoders", [FFmpegEncoderEnum.CPU, ...vendors]);
};
