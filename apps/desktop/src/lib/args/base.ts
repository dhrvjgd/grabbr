import type { BasePreferences } from "@grabbr/shared/ytdlp";

export const buildBaseArgs = (base: BasePreferences) => {
  const args: string[] = [];

  const {
    general,
    network,
    geoRestriction,
    videoSelection,
    download,
    filesystem,
    thumbnail,
    internetShortcut,
    verbosity,
    workarounds,
    authentication,
    sponsorblock,
    extractor,
  } = base;

  if (general.help) args.push("--help");
  if (general.version) args.push("--version");
  if (general.update) args.push("--update");
  if (general.noUpdate) args.push("--no-update");
  if (general.updateTo) args.push("--update-to", general.updateTo);
  if (general.ignoreErrors) args.push("--ignore-errors");
  if (general.noAbortOnError) args.push("--no-abort-on-error");
  if (general.abortOnError) args.push("--abort-on-error");
  if (general.listExtractors) args.push("--list-extractors");
  if (general.extractorDescriptions) args.push("--extractor-descriptions");
  if (general.useExtractors) args.push("--use-extractors", general.useExtractors);
  if (general.defaultSearch) args.push("--default-search", general.defaultSearch);
  if (general.ignoreConfig) args.push("--ignore-config");
  if (general.noConfigLocations) args.push("--no-config-locations");
  if (general.configLocations) args.push("--config-locations", general.configLocations);
  if (general.pluginDirs) args.push("--plugin-dirs", general.pluginDirs);
  if (general.noPluginDirs) args.push("--no-plugin-dirs");
  if (general.flatPlaylist) args.push("--flat-playlist");
  if (general.noFlatPlaylist) args.push("--no-flat-playlist");
  if (general.liveFromStart) args.push("--live-from-start");
  if (general.noLiveFromStart) args.push("--no-live-from-start");
  if (general.waitForVideo) args.push("--wait-for-video", general.waitForVideo);
  if (general.noWaitForVideo) args.push("--no-wait-for-video");
  if (general.markWatched) args.push("--mark-watched");
  if (general.noMarkWatched) args.push("--no-mark-watched");
  if (general.color) args.push("--color", general.color);
  if (general.compatOptions) args.push("--compat-options", general.compatOptions);
  if (general.alias) args.push("--alias", general.alias);
  if (general.presetAlias) args.push("--preset-alias", general.presetAlias);
  args.push("--js-runtimes", general.jsRuntimes);
  if (general.noJsRuntimes) args.push("--no-js-runtimes");
  if (general.remoteComponents) args.push("--remote-components", general.remoteComponents);
  if (general.noRemoteComponents) args.push("--no-remote-components");

  if (network) {
    if (network.proxy) args.push("--proxy", network.proxy);
    if (network.socketTimeout) args.push("--socket-timeout", String(network.socketTimeout));
    if (network.sourceAddress) args.push("--source-address", network.sourceAddress);
    if (network.impersonate) args.push("--impersonate", network.impersonate);
    if (network.listImpersonateTargets) args.push("--list-impersonate-targets");
    if (network.forceIpv4) args.push("--force-ipv4");
    if (network.forceIpv6) args.push("--force-ipv6");
    if (network.enableFileUrls) args.push("--enable-file-urls");
  }

  if (geoRestriction) {
    if (geoRestriction.geoVerificationProxy)
      args.push("--geo-verification-proxy", geoRestriction.geoVerificationProxy);
    if (geoRestriction.xff) args.push("--xff", geoRestriction.xff);
  }

  if (videoSelection.playlistItems) args.push("--playlist-items", videoSelection.playlistItems);
  if (videoSelection.minFilesize) args.push("--min-filesize", videoSelection.minFilesize);
  if (videoSelection.maxFilesize) args.push("--max-filesize", videoSelection.maxFilesize);
  if (videoSelection.date) args.push("--date", videoSelection.date);
  if (videoSelection.datebefore) args.push("--datebefore", videoSelection.datebefore);
  if (videoSelection.dateafter) args.push("--dateafter", videoSelection.dateafter);
  if (videoSelection.matchFilters) args.push("--match-filters", videoSelection.matchFilters);
  if (videoSelection.noMatchFilters) args.push("--no-match-filters");
  if (videoSelection.breakMatchFilters)
    args.push("--break-match-filters", videoSelection.breakMatchFilters);
  if (videoSelection.noBreakMatchFilters) args.push("--no-break-match-filters");
  if (videoSelection.noPlaylist) args.push("--no-playlist");
  if (videoSelection.yesPlaylist) args.push("--yes-playlist");
  if (videoSelection.ageLimit) args.push("--age-limit", String(videoSelection.ageLimit));
  if (videoSelection.downloadArchive)
    args.push("--download-archive", videoSelection.downloadArchive);
  if (videoSelection.noDownloadArchive) args.push("--no-download-archive");
  if (videoSelection.maxDownloads)
    args.push("--max-downloads", String(videoSelection.maxDownloads));
  if (videoSelection.breakOnExisting) args.push("--break-on-existing");
  if (videoSelection.noBreakOnExisting) args.push("--no-break-on-existing");
  if (videoSelection.breakPerInput) args.push("--break-per-input");
  if (videoSelection.noBreakPerInput) args.push("--no-break-per-input");
  if (videoSelection.skipPlaylistAfterErrors)
    args.push("--skip-playlist-after-errors", String(videoSelection.skipPlaylistAfterErrors));

  if (download) {
    if (download.concurrentFragments)
      args.push("--concurrent-fragments", String(download.concurrentFragments));
    if (download.limitRate) args.push("--limit-rate", download.limitRate);
    if (download.throttledRate) args.push("--throttled-rate", download.throttledRate);
    if (download.retries !== undefined) args.push("--retries", String(download.retries));
    if (download.fileAccessRetries !== undefined)
      args.push("--file-access-retries", String(download.fileAccessRetries));
    if (download.fragmentRetries !== undefined)
      args.push("--fragment-retries", String(download.fragmentRetries));
    if (download.retrySleep) args.push("--retry-sleep", download.retrySleep);
    if (download.skipUnavailableFragments) args.push("--skip-unavailable-fragments");
    if (download.abortOnUnavailableFragments) args.push("--abort-on-unavailable-fragments");
    if (download.keepFragments) args.push("--keep-fragments");
    if (download.noKeepFragments) args.push("--no-keep-fragments");
    if (download.bufferSize) args.push("--buffer-size", download.bufferSize);
    if (download.resizeBuffer) args.push("--resize-buffer");
    if (download.noResizeBuffer) args.push("--no-resize-buffer");
    if (download.httpChunkSize) args.push("--http-chunk-size", download.httpChunkSize);
    if (download.playlistRandom) args.push("--playlist-random");
    if (download.lazyPlaylist) args.push("--lazy-playlist");
    if (download.noLazyPlaylist) args.push("--no-lazy-playlist");
    if (download.xattrSetFilesize) args.push("--xattr-set-filesize");
    if (download.hlsUseMpegts) args.push("--hls-use-mpegts");
    if (download.noHlsUseMpegts) args.push("--no-hls-use-mpegts");
    if (download.downloadSections) args.push("--download-sections", download.downloadSections);
    if (download.downloader) args.push("--downloader", download.downloader);
    if (download.downloaderArgs) args.push("--downloader-args", download.downloaderArgs);
  }

  if (filesystem.batchFile) args.push("--batch-file", filesystem.batchFile);
  if (filesystem.noBatchFile) args.push("--no-batch-file");
  if (filesystem.paths) {
    const { paths } = filesystem;
    if (paths.home) args.push("--paths", `home:${paths.home}`);
    if (paths.temp) args.push("--paths", `temp:${paths.temp}`);
    if (paths.subtitles) args.push("--paths", `subtitle:${paths.subtitles}`);
    if (paths.thumbnails) args.push("--paths", `thumbnail:${paths.thumbnails}`);
    if (paths.description) args.push("--paths", `description:${paths.description}`);
    if (paths.infojson) args.push("--paths", `infojson:${paths.infojson}`);
    if (paths.annotations) args.push("--paths", `annotation:${paths.annotations}`);
    if (paths.playlist) args.push("--paths", `pl_video:${paths.playlist}`);
    if (paths.pl_description) args.push("--paths", `pl_description:${paths.pl_description}`);
    if (paths.pl_infojson) args.push("--paths", `pl_infojson:${paths.pl_infojson}`);
  }
  args.push("--output", `${filesystem.output}/%(title)s.%(ext)s`);
  if (filesystem.outputNaPlaceholder)
    args.push("--output-na-placeholder", filesystem.outputNaPlaceholder);
  if (filesystem.restrictFilenames) args.push("--restrict-filenames");
  if (filesystem.noRestrictFilenames) args.push("--no-restrict-filenames");
  if (filesystem.windowsFilenames) args.push("--windows-filenames");
  if (filesystem.noWindowsFilenames) args.push("--no-windows-filenames");
  if (filesystem.trimFilenames) args.push("--trim-filenames", String(filesystem.trimFilenames));
  if (filesystem.noOverwrites) args.push("--no-overwrites");
  if (filesystem.forceOverwrites) args.push("--force-overwrites");
  if (filesystem.noForceOverwrites) args.push("--no-force-overwrites");
  if (filesystem.continue) args.push("--continue");
  if (filesystem.noContinue) args.push("--no-continue");
  if (filesystem.part) args.push("--part");
  if (filesystem.noPart) args.push("--no-part");
  if (filesystem.mtime) args.push("--mtime");
  if (filesystem.noMtime) args.push("--no-mtime");
  if (filesystem.writeDescription) args.push("--write-description");
  if (filesystem.noWriteDescription) args.push("--no-write-description");
  if (filesystem.writeInfoJson) args.push("--write-info-json");
  if (filesystem.noWriteInfoJson) args.push("--no-write-info-json");
  if (filesystem.writePlaylistMetafiles) args.push("--write-playlist-metafiles");
  if (filesystem.noWritePlaylistMetafiles) args.push("--no-write-playlist-metafiles");
  if (filesystem.cleanInfoJson) args.push("--clean-info-json");
  if (filesystem.noCleanInfoJson) args.push("--no-clean-info-json");
  if (filesystem.writeComments) args.push("--write-comments");
  if (filesystem.noWriteComments) args.push("--no-write-comments");
  if (filesystem.loadInfoJson) args.push("--load-info-json", filesystem.loadInfoJson);
  if (filesystem.cookies) args.push("--cookies", filesystem.cookies);
  if (filesystem.noCookies) args.push("--no-cookies");
  if (filesystem.cookiesFromBrowser)
    args.push("--cookies-from-browser", filesystem.cookiesFromBrowser);
  if (filesystem.noCookiesFromBrowser) args.push("--no-cookies-from-browser");
  if (filesystem.cacheDir) args.push("--cache-dir", filesystem.cacheDir);
  if (filesystem.noCacheDir) args.push("--no-cache-dir");
  if (filesystem.rmCacheDir) args.push("--rm-cache-dir");

  if (thumbnail) {
    if (thumbnail.writeThumbnail) args.push("--write-thumbnail");
    if (thumbnail.noWriteThumbnail) args.push("--no-write-thumbnail");
    if (thumbnail.writeAllThumbnails) args.push("--write-all-thumbnails");
    if (thumbnail.listThumbnails) args.push("--list-thumbnails");
  }

  if (internetShortcut) {
    if (internetShortcut.writeLink) args.push("--write-link");
    if (internetShortcut.writeUrlLink) args.push("--write-url-link");
    if (internetShortcut.writeWeblocLink) args.push("--write-webloc-link");
    if (internetShortcut.writeDesktopLink) args.push("--write-desktop-link");
  }

  if (verbosity) {
    if (verbosity.quiet) args.push("--quiet");
    if (verbosity.noQuiet) args.push("--no-quiet");
    if (verbosity.noWarnings) args.push("--no-warnings");
    if (verbosity.simulate) args.push("--simulate");
    if (verbosity.noSimulate) args.push("--no-simulate");
    if (verbosity.ignoreNoFormatsError) args.push("--ignore-no-formats-error");
    if (verbosity.noIgnoreNoFormatsError) args.push("--no-ignore-no-formats-error");
    if (verbosity.skipDownload) args.push("--skip-download");
    if (verbosity.print) args.push("--print", verbosity.print);
    if (verbosity.printToFile) args.push("--print-to-file", verbosity.printToFile);
    if (verbosity.dumpJson) args.push("--dump-json");
    if (verbosity.dumpSingleJson) args.push("--dump-single-json");
    if (verbosity.forceWriteArchive) args.push("--force-write-archive");
    if (verbosity.newline) args.push("--newline");
    if (verbosity.noProgress) args.push("--no-progress");
    if (verbosity.progress) args.push("--progress");
    if (verbosity.consoleTitle) args.push("--console-title");
    if (verbosity.progressTemplate) args.push("--progress-template", verbosity.progressTemplate);
    if (verbosity.progressDelta !== undefined)
      args.push("--progress-delta", String(verbosity.progressDelta));
    if (verbosity.verbose) args.push("--verbose");
    if (verbosity.dumpPages) args.push("--dump-pages");
    if (verbosity.writePages) args.push("--write-pages");
    if (verbosity.printTraffic) args.push("--print-traffic");
  }

  if (workarounds) {
    if (workarounds.encoding) args.push("--encoding", workarounds.encoding);
    if (workarounds.legacyServerConnect) args.push("--legacy-server-connect");
    if (workarounds.noCheckCertificates) args.push("--no-check-certificates");
    if (workarounds.preferInsecure) args.push("--prefer-insecure");
    if (workarounds.addHeaders) {
      for (const [key, value] of Object.entries(workarounds.addHeaders)) {
        args.push("--add-headers", `${key}:${value}`);
      }
    }
    if (workarounds.bidiWorkaround) args.push("--bidi-workaround");
    if (workarounds.sleepRequests) args.push("--sleep-requests", String(workarounds.sleepRequests));
    if (workarounds.sleepInterval) args.push("--sleep-interval", String(workarounds.sleepInterval));
    if (workarounds.maxSleepInterval)
      args.push("--max-sleep-interval", String(workarounds.maxSleepInterval));
    if (workarounds.sleepSubtitles)
      args.push("--sleep-subtitles", String(workarounds.sleepSubtitles));
  }

  if (authentication) {
    if (authentication.username) args.push("--username", authentication.username);
    if (authentication.password) args.push("--password", authentication.password);
    if (authentication.twofactor) args.push("--twofactor", authentication.twofactor);
    if (authentication.netrc) args.push("--netrc");
    if (authentication.netrcLocation) args.push("--netrc-location", authentication.netrcLocation);
    if (authentication.netrcCmd) args.push("--netrc-cmd", authentication.netrcCmd);
    if (authentication.videoPassword) args.push("--video-password", authentication.videoPassword);
    if (authentication.apMso) args.push("--ap-mso", authentication.apMso);
    if (authentication.apUsername) args.push("--ap-username", authentication.apUsername);
    if (authentication.apPassword) args.push("--ap-password", authentication.apPassword);
    if (authentication.apListMso) args.push("--ap-list-mso");
    if (authentication.clientCertificate)
      args.push("--client-certificate", authentication.clientCertificate);
    if (authentication.clientCertificateKey)
      args.push("--client-certificate-key", authentication.clientCertificateKey);
    if (authentication.clientCertificatePassword)
      args.push("--client-certificate-password", authentication.clientCertificatePassword);
  }

  if (sponsorblock) {
    if (sponsorblock.sponsorblockMark?.length)
      args.push("--sponsorblock-mark", sponsorblock.sponsorblockMark.join(","));
    if (sponsorblock.sponsorblockRemove?.length)
      args.push("--sponsorblock-remove", sponsorblock.sponsorblockRemove.join(","));
    if (sponsorblock.sponsorblockChapterTitle)
      args.push("--sponsorblock-chapter-title", sponsorblock.sponsorblockChapterTitle);
    if (sponsorblock.noSponsorblock) args.push("--no-sponsorblock");
    if (sponsorblock.sponsorblockApi) args.push("--sponsorblock-api", sponsorblock.sponsorblockApi);
  }

  if (extractor) {
    if (extractor.extractorRetries !== undefined)
      args.push("--extractor-retries", String(extractor.extractorRetries));
    if (extractor.allowDynamicMpd) args.push("--allow-dynamic-mpd");
    if (extractor.ignoreDynamicMpd) args.push("--ignore-dynamic-mpd");
    if (extractor.hlsSplitDiscontinuity) args.push("--hls-split-discontinuity");
    if (extractor.noHlsSplitDiscontinuity) args.push("--no-hls-split-discontinuity");
    if (extractor.extractorArgs) {
      for (const [key, value] of Object.entries(extractor.extractorArgs)) {
        args.push("--extractor-args", `${key}:${value}`);
      }
    }
  }

  return args;
};
