import type { FFmpegAPI } from "./ffmpeg";

export const enum JsRuntimesEnum {
  NODE = "node",
  BUN = "bun",
  DENO = "deno",
  QUICKJS = "quickjs",
}

export const enum AudioFormatEnum {
  BEST = "best",
  AAC = "aac",
  ALAC = "alac",
  FLAC = "flac",
  M4A = "m4a",
  MP3 = "mp3",
  OPUS = "opus",
  VORBIS = "vorbis",
  WAV = "wav",
}

export const enum AudioQualityEnum {
  BEST = "best",
  ZERO = "0",
  ONE = "1",
  TWO = "2",
  THREE = "3",
  FOUR = "4",
  FIVE = "5",
  SIX = "6",
  SEVEN = "7",
  EIGHT = "8",
  NINE = "9",
  TEN = "10",
  "320K" = "320K",
  "256K" = "256K",
  "224K" = "224K",
  "192K" = "192K",
  "160K" = "160K",
  "128K" = "128K",
  "96K" = "96K",
  "64K" = "64K",
}

export const enum VideoMergeOutputFormatEnum {
  MKV = "mkv",
  MOV = "mov",
  MP4 = "mp4",
  WEBM = "webm",
  AVI = "avi",
  FLV = "flv",
}

export const enum VideoCodecEnum {
  AV01 = "av01",
  VP9_2 = "vp9.2",
  VP9 = "vp9",
  H265 = "h265",
  H264 = "h264",
  VP8 = "vp8",
  H263 = "h263",
  THEORA = "theora",
}

export const QLTY_CHNG_AUDIO_FMTS: AudioFormatEnum[] = [
  AudioFormatEnum.OPUS,
  AudioFormatEnum.M4A,
  AudioFormatEnum.MP3,
  AudioFormatEnum.VORBIS,
];

export const THUMB_EMBED_AUDIO_FMTS: AudioFormatEnum[] = [
  AudioFormatEnum.FLAC,
  AudioFormatEnum.OPUS,
  AudioFormatEnum.M4A,
  AudioFormatEnum.MP3,
];

export const THUMB_EMBED_VIDEO_FMTS: VideoMergeOutputFormatEnum[] = [
  VideoMergeOutputFormatEnum.MP4,
  VideoMergeOutputFormatEnum.MKV,
  VideoMergeOutputFormatEnum.MOV,
];

export type BasePreferences = {
  general: {
    help?: boolean;
    version?: boolean;
    update?: boolean;
    noUpdate?: boolean;
    updateTo?: string;
    ignoreErrors?: boolean;
    noAbortOnError?: boolean;
    abortOnError?: boolean;
    listExtractors?: boolean;
    extractorDescriptions?: boolean;
    useExtractors?: string;
    defaultSearch?: "auto" | "auto_warning" | "error" | "fixup_error" | (string & {});
    ignoreConfig?: boolean;
    noConfigLocations?: boolean;
    configLocations?: string;
    pluginDirs?: "default" | (string & {});
    noPluginDirs?: boolean;
    flatPlaylist?: boolean;
    noFlatPlaylist?: boolean;
    liveFromStart?: boolean;
    noLiveFromStart?: boolean;
    waitForVideo?: string;
    noWaitForVideo?: boolean;
    markWatched?: boolean;
    noMarkWatched?: boolean;
    color?: "always" | "auto" | "never" | "no_color" | "auto-tty" | "no_color-tty" | (string & {});
    compatOptions?: string;
    alias?: string;
    presetAlias?: "mp3" | "aac" | "mp4" | "mkv" | "sleep";
    jsRuntimes: JsRuntimesEnum;
    noJsRuntimes?: boolean;
    remoteComponents?: "ejs:npm" | "ejs:github";
    noRemoteComponents?: boolean;
  };

  network?: {
    proxy?: string;
    socketTimeout?: number;
    sourceAddress?: string;
    impersonate?: "chrome" | "chrome-110" | "chrome:windows-10" | "safari" | "edge" | (string & {});
    listImpersonateTargets?: boolean;
    forceIpv4?: boolean;
    forceIpv6?: boolean;
    enableFileUrls?: boolean;
  };

  geoRestriction?: {
    geoVerificationProxy?: string;
    xff?: "default" | "never" | (string & {});
  };

  videoSelection: {
    playlistItems?: string;
    minFilesize?: string;
    maxFilesize?: string;
    date?: string;
    datebefore?: string;
    dateafter?: string;
    matchFilters?: string;
    noMatchFilters?: boolean;
    breakMatchFilters?: string;
    noBreakMatchFilters?: boolean;
    noPlaylist: boolean;
    yesPlaylist?: boolean;
    ageLimit?: number;
    downloadArchive?: string;
    noDownloadArchive?: boolean;
    maxDownloads?: number;
    breakOnExisting?: boolean;
    noBreakOnExisting?: boolean;
    breakPerInput?: boolean;
    noBreakPerInput?: boolean;
    skipPlaylistAfterErrors?: number;
  };

  download?: {
    concurrentFragments?: number;
    limitRate?: string;
    throttledRate?: string;
    retries?: number | "infinite";
    fileAccessRetries?: number | "infinite";
    fragmentRetries?: number | "infinite";
    retrySleep?: string;
    skipUnavailableFragments?: boolean;
    abortOnUnavailableFragments?: boolean;
    keepFragments?: boolean;
    noKeepFragments?: boolean;
    bufferSize?: string;
    resizeBuffer?: boolean;
    noResizeBuffer?: boolean;
    httpChunkSize?: string;
    playlistRandom?: boolean;
    lazyPlaylist?: boolean;
    noLazyPlaylist?: boolean;
    xattrSetFilesize?: boolean;
    hlsUseMpegts?: boolean;
    noHlsUseMpegts?: boolean;
    downloadSections?: string;
    downloader?:
      | "native"
      | "aria2c"
      | "axel"
      | "curl"
      | "ffmpeg"
      | "httpie"
      | "wget"
      | (string & {});
    downloaderArgs?: string;
  };

  filesystem: {
    batchFile?: string;
    noBatchFile?: boolean;
    paths?: {
      home?: string;
      temp?: string;
      output?: string;
      subtitles?: string;
      thumbnails?: string;
      description?: string;
      infojson?: string;
      annotations?: string;
      playlist?: string;
      pl_description?: string;
      pl_infojson?: string;
    };
    output: string;
    outputNaPlaceholder?: string;
    restrictFilenames: boolean;
    noRestrictFilenames?: boolean;
    windowsFilenames?: boolean;
    noWindowsFilenames?: boolean;
    trimFilenames?: number;
    noOverwrites: boolean;
    forceOverwrites?: boolean;
    noForceOverwrites?: boolean;
    continue?: boolean;
    noContinue?: boolean;
    part?: boolean;
    noPart: boolean;
    mtime?: boolean;
    noMtime?: boolean;
    writeDescription?: boolean;
    noWriteDescription?: boolean;
    writeInfoJson?: boolean;
    noWriteInfoJson?: boolean;
    writePlaylistMetafiles?: boolean;
    noWritePlaylistMetafiles?: boolean;
    cleanInfoJson?: boolean;
    noCleanInfoJson?: boolean;
    writeComments?: boolean;
    noWriteComments?: boolean;
    loadInfoJson?: string;
    cookies?: string;
    noCookies?: boolean;
    cookiesFromBrowser?:
      | "brave"
      | "chrome"
      | "chromium"
      | "edge"
      | "firefox"
      | "opera"
      | "safari"
      | "vivaldi"
      | "whale"
      | (string & {});
    noCookiesFromBrowser?: boolean;
    cacheDir?: string;
    noCacheDir?: boolean;
    rmCacheDir?: boolean;
  };

  thumbnail?: {
    writeThumbnail?: boolean;
    noWriteThumbnail?: boolean;
    writeAllThumbnails?: boolean;
    listThumbnails?: boolean;
  };

  internetShortcut?: {
    writeLink?: boolean;
    writeUrlLink?: boolean;
    writeWeblocLink?: boolean;
    writeDesktopLink?: boolean;
  };

  verbosity?: {
    quiet?: boolean;
    noQuiet?: boolean;
    noWarnings?: boolean;
    simulate?: boolean;
    noSimulate?: boolean;
    ignoreNoFormatsError?: boolean;
    noIgnoreNoFormatsError?: boolean;
    skipDownload?: boolean;
    print?: string;
    printToFile?: string;
    dumpJson?: boolean;
    dumpSingleJson?: boolean;
    forceWriteArchive?: boolean;
    newline?: boolean;
    noProgress?: boolean;
    progress?: boolean;
    consoleTitle?: boolean;
    progressTemplate?: string;
    progressDelta?: number;
    verbose?: boolean;
    dumpPages?: boolean;
    writePages?: boolean;
    printTraffic?: boolean;
  };

  workarounds?: {
    encoding?: string;
    legacyServerConnect?: boolean;
    noCheckCertificates?: boolean;
    preferInsecure?: boolean;
    addHeaders?: Record<string, string>;
    bidiWorkaround?: boolean;
    sleepRequests?: number;
    sleepInterval?: number;
    maxSleepInterval?: number;
    sleepSubtitles?: number;
  };

  authentication?: {
    username?: string;
    password?: string;
    twofactor?: string;
    netrc?: boolean;
    netrcLocation?: string;
    netrcCmd?: string;
    videoPassword?: string;
    apMso?: string;
    apUsername?: string;
    apPassword?: string;
    apListMso?: boolean;
    clientCertificate?: string;
    clientCertificateKey?: string;
    clientCertificatePassword?: string;
  };

  sponsorblock?: {
    sponsorblockMark?: Array<
      | "sponsor"
      | "intro"
      | "outro"
      | "selfpromo"
      | "preview"
      | "filler"
      | "interaction"
      | "music_offtopic"
      | "poi_highlight"
      | "chapter"
      | "all"
      | "hook"
      | "default"
    >;
    sponsorblockRemove?: Array<
      | "sponsor"
      | "intro"
      | "outro"
      | "selfpromo"
      | "preview"
      | "filler"
      | "interaction"
      | "music_offtopic"
      | "all"
      | "hook"
      | "default"
    >;
    sponsorblockChapterTitle?: string;
    noSponsorblock?: boolean;
    sponsorblockApi?: string;
  };

  extractor?: {
    extractorRetries?: number | "infinite";
    allowDynamicMpd?: boolean;
    ignoreDynamicMpd?: boolean;
    hlsSplitDiscontinuity?: boolean;
    noHlsSplitDiscontinuity?: boolean;
    extractorArgs?: Record<string, string>;
  };
};

export type AudioPreferences = {
  preset: "best" | "custom";
  custom: {
    postProcessing: {
      audioFormat: AudioFormatEnum;
      audioQuality: AudioQualityEnum;
      postprocessorArgs?: FFmpegAPI;
      keepVideo?: boolean;
      noKeepVideo?: boolean;
      postOverwrites: boolean;
      noPostOverwrites?: boolean;
      embedThumbnail: boolean;
      noEmbedThumbnail?: boolean;
      embedMetadata: boolean;
      noEmbedMetadata?: boolean;
      embedChapters: boolean;
      noEmbedChapters?: boolean;
      embedInfoJson?: boolean;
      noEmbedInfoJson?: boolean;
      parseMetadata?: string;
      replaceInMetadata?: string;
      xattrs?: boolean;
      concatPlaylist?: "never" | "always" | "multi_video";
      fixup?: "never" | "warn" | "detect_or_warn" | "force";
      ffmpegLocation?: string;
      exec?: string;
      noExec?: boolean;
      splitChapters?: boolean;
      noSplitChapters?: boolean;
      removeChapters?: string;
      noRemoveChapters?: boolean;
      forceKeyframesAtCuts?: boolean;
      noForceKeyframesAtCuts?: boolean;
      usePostprocessor?: string;
    };
  };
};

export type VideoPreferences = {
  preset: "best" | "custom";
  custom: {
    videoFormat: {
      format: string;
      formatSort: {
        enabled: boolean;
        hasVid?: boolean;
        hasAud?: boolean;
        iePref?: string;
        lang?: string;
        quality?: string;
        source?: string;
        proto?: "https" | "http" | "m3u8_native" | "m3u8" | "dash" | "ftp" | "ftps";
        vcodec: VideoCodecEnum;
        acodec?:
          | "flac"
          | "alac"
          | "wav"
          | "aiff"
          | "opus"
          | "vorbis"
          | "aac"
          | "mp4a"
          | "mp3"
          | "ac4"
          | "eac3"
          | "ac3"
          | "dts";
        vext?: "mp4" | "mov" | "webm" | "flv";
        aext?: "m4a" | "aac" | "mp3" | "ogg" | "opus" | "webm";
        ext?: string;
        filesize?: number;
        fsApprox?: number;
        height?: number;
        width?: number;
        res?: number;
        fps?: number;
        hdr?: "DV" | "HDR12" | "HDR10+" | "HDR10" | "HLG" | "SDR";
        channels?: number;
        tbr?: number;
        vbr?: number;
        abr?: number;
        br?: number;
        asr?: number;
      };
      formatSortReset?: boolean;
      formatSortForce?: boolean;
      noFormatSortForce?: boolean;
      videoMultistreams?: boolean;
      noVideoMultistreams?: boolean;
      audioMultistreams?: boolean;
      noAudioMultistreams?: boolean;
      preferFreeFormats?: boolean;
      noPreferFreeFormats?: boolean;
      checkFormats?: boolean;
      checkAllFormats?: boolean;
      noCheckFormats?: boolean;
      listFormats?: boolean;
      mergeOutputFormat: VideoMergeOutputFormatEnum;
    };

    subtitle?: {
      writeSubs?: boolean;
      noWriteSubs?: boolean;
      writeAutoSubs?: boolean;
      noWriteAutoSubs?: boolean;
      listSubs?: boolean;
      subFormat?: "best" | "srt" | "ass" | "vtt";
      subLangs?: string;
    };

    postProcessing: {
      remuxVideo?:
        | "avi"
        | "flv"
        | "gif"
        | "mkv"
        | "mov"
        | "mp4"
        | "webm"
        | "aac"
        | "aiff"
        | "alac"
        | "flac"
        | "m4a"
        | "mka"
        | "mp3"
        | "ogg"
        | "opus"
        | "vorbis"
        | "wav";
      recodeVideo?:
        | "avi"
        | "flv"
        | "gif"
        | "mkv"
        | "mov"
        | "mp4"
        | "webm"
        | "aac"
        | "aiff"
        | "alac"
        | "flac"
        | "m4a"
        | "mka"
        | "mp3"
        | "ogg"
        | "opus"
        | "vorbis"
        | "wav";
      postProcessorArgs: FFmpegAPI;
      keepVideo?: boolean;
      noKeepVideo?: boolean;
      postOverwrites: boolean;
      noPostOverwrites?: boolean;
      embedSubs: boolean;
      noEmbedSubs?: boolean;
      embedThumbnail: boolean;
      noEmbedThumbnail?: boolean;
      embedMetadata: boolean;
      noEmbedMetadata?: boolean;
      embedChapters: boolean;
      noEmbedChapters?: boolean;
      embedInfoJson?: boolean;
      noEmbedInfoJson?: boolean;
      parseMetadata?: string;
      replaceInMetadata?: string;
      xattrs?: boolean;
      concatPlaylist?: "never" | "always" | "multi_video";
      fixup?: "never" | "warn" | "detect_or_warn" | "force";
      ffmpegLocation?: string;
      exec?: string;
      noExec?: boolean;
      convertSubs?: "ass" | "lrc" | "srt" | "vtt" | "none";
      convertThumbnails?: "jpg" | "png" | "webp" | "none";
      splitChapters?: boolean;
      noSplitChapters?: boolean;
      removeChapters?: string;
      noRemoveChapters?: boolean;
      forceKeyframesAtCuts?: boolean;
      noForceKeyframesAtCuts?: boolean;
      usePostprocessor?: string;
    };
  };
};
