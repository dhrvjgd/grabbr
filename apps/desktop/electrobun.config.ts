import type { ElectrobunConfig } from "electrobun/bun";

const webBuildDir = "../ui/dist";
const isWindows = process.platform === "win32";
const ext = isWindows ? ".exe" : "";

export default {
  app: {
    name: "Grabbr",
    description: "Multimedia Downloader",
    identifier: "grabbr",
    version: "0.2.3",
  },
  runtime: {
    exitOnLastWindowClosed: true,
  },
  build: {
    mainProcess: "bun",
    useAsar: true,
    asarUnpack: [
      "*.node",
      "*.dll",
      "*.dylib",
      "*.so",
      `bin/ffmpeg${ext}`,
      `bin/ffprobe${ext}`,
      `bin/yt-dlp${ext}`,
    ],
    bun: {
      entrypoint: "src/index.ts",
      minify: true,
      format: "esm",
    },
    copy: {
      [webBuildDir]: "views/mainview",
      [`bin/ffmpeg${ext}`]: `bin/ffmpeg${ext}`,
      [`bin/ffprobe${ext}`]: `bin/ffprobe${ext}`,
      [`bin/yt-dlp${ext}`]: `bin/yt-dlp${ext}`,
    },
    watchIgnore: [`${webBuildDir}/**`],
    mac: {
      defaultRenderer: "native",
      bundleCEF: false,
      icons: "assets/icon.iconset",
      entitlements: {
        "com.apple.security.cs.allow-jit": true,
        "com.apple.security.cs.allow-unsigned-executable-memory": true,
        "com.apple.security.cs.allow-dyld-environment-variables": true,
        "com.apple.security.cs.disable-library-validation": true,
        "com.apple.security.network.client": true,
      },
    },
    linux: {
      defaultRenderer: "native",
      bundleCEF: false,
      icon: "assets/icon.iconset/icon_256x256.png",
    },
    win: {
      defaultRenderer: "native",
      bundleCEF: false,
      icon: "assets/icon.ico",
    },
    // bunVersion: "1.3.14",
  },
  release: {
    baseUrl: "https://github.com/dhrvjgd/grabbr/releases/latest/download/",
    generatePatch: true,
  },
  scripts: {
    preBuild: "scripts/pre-build/index.ts",
    postBuild: "scripts/post-build/index.ts",
    // postWrap: ,
    postPackage: "scripts/post-package/index.ts",
  },
} satisfies ElectrobunConfig;
