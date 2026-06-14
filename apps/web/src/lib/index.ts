const BASE_URL = "https://github.com/dhrvjgd/grabbr/releases/latest/download" as const;
export const RELEASES_PAGE = "https://github.com/dhrvjgd/grabbr/releases/latest" as const;

const assets = {
  windows: "stable-win-x64-Grabbr-Setup.zip",
  macos: {
    x64: "stable-macos-x64-Grabbr.dmg",
    arm64: "stable-macos-arm64-Grabbr.dmg",
  },
  linux: {
    x64: "stable-linux-x64-Grabbr-Setup.tar.gz",
    arm64: "stable-linux-arm64-Grabbr-Setup.tar.gz",
  },
} as const;

export type OS = "windows" | "macos" | "linux" | "unknown";
export type Arch = "x64" | "arm64" | "unknown";

export interface DownloadInfo {
  link: string;
  os: OS;
  arch: Arch;
  isMobile: boolean;
}

export async function getDownloadInfo(): Promise<DownloadInfo> {
  const ua = navigator.userAgent;

  // --- Mobile / tablet - nothing to download, handle separately in UI ---
  if (isMobileDevice(ua)) {
    return { link: RELEASES_PAGE, os: "unknown", arch: "unknown", isMobile: true };
  }

  // --- Windows ---
  if (/Windows/i.test(ua)) {
    const arch: Arch = (await isArmArch(ua)) ? "arm64" : "x64";
    return { link: `${BASE_URL}/${assets.windows}`, os: "windows", arch, isMobile: false };
  }

  // --- macOS ---
  if (/Macintosh|Mac OS X/i.test(ua)) {
    const arch: Arch = (await isArmArch(ua)) ? "arm64" : "x64";
    const asset = arch === "arm64" ? assets.macos.arm64 : assets.macos.x64;
    return { link: `${BASE_URL}/${asset}`, os: "macos", arch, isMobile: false };
  }

  // --- Linux ---
  if (/Linux/i.test(ua)) {
    const arch: Arch = (await isArmArch(ua)) ? "arm64" : "x64";
    const asset = arch === "arm64" ? assets.linux.arm64 : assets.linux.x64;
    return { link: `${BASE_URL}/${asset}`, os: "linux", arch, isMobile: false };
  }

  // --- Anything else (ChromeOS, exotic UAs, bots, etc.) ---
  return { link: RELEASES_PAGE, os: "unknown", arch: "unknown", isMobile: false };
}

// Phones/tablets - covers Android, iOS, and iPad (which spoofs the macOS UA)
function isMobileDevice(ua: string): boolean {
  const uaData = (navigator as any).userAgentData;
  if (uaData && typeof uaData.mobile === "boolean") {
    return uaData.mobile;
  }

  // iPad on iPadOS 13+ reports as "Macintosh" but has touch
  if (/Macintosh/i.test(ua) && navigator.maxTouchPoints > 1) {
    return true;
  }

  return /Android|iPhone|iPod|Mobile|IEMobile|BlackBerry|Opera Mini/i.test(ua);
}

// ARM64 detection (Apple Silicon / ARM Linux) with layered fallbacks
async function isArmArch(ua: string): Promise<boolean> {
  // 1. Client Hints - accurate, Chromium only
  const uaData = (navigator as any).userAgentData;
  if (uaData?.getHighEntropyValues) {
    try {
      const { architecture } = await uaData.getHighEntropyValues(["architecture"]);
      if (architecture) return architecture.toLowerCase().includes("arm");
    } catch {}
  }

  // 2. WebGL renderer sniff - catches Apple Silicon on Safari/Firefox
  try {
    const canvas = document.createElement("canvas");
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    const ext = gl?.getExtension("WEBGL_debug_renderer_info");
    if (gl && ext) {
      const renderer = gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) as string;
      if (/Apple M\d/i.test(renderer)) return true;
    }
  } catch {}

  // 3. UA string regex - last resort, rarely matches on modern browsers
  return /arm|aarch64/i.test(ua);
}
