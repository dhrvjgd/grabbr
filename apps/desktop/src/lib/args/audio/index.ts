import {
  QLTY_CHNG_AUDIO_FMTS,
  THUMB_EMBED_AUDIO_FMTS,
  AudioFormatEnum,
  AudioQualityEnum,
  type AudioPreferences,
} from "@grabbr/shared/ytdlp";

export const buildAudioArgs = (audio: AudioPreferences) => {
  const args: string[] = [];

  args.push("--extract-audio");

  if (audio.preset === "best") {
    args.push(
      "--format",
      "bestaudio/best",
      "--audio-quality",
      "0",
      "--audio-format",
      AudioFormatEnum.MP3,
      "--embed-metadata",
      "--embed-chapters",
    );
    return args;
  }

  const { postProcessing } = audio.custom;

  args.push("--audio-format", postProcessing.audioFormat);
  args.push(
    "--audio-quality",
    QLTY_CHNG_AUDIO_FMTS.includes(postProcessing.audioFormat)
      ? postProcessing.audioQuality
      : AudioQualityEnum.ZERO,
  );

  if (
    postProcessing.embedThumbnail &&
    THUMB_EMBED_AUDIO_FMTS.includes(postProcessing.audioFormat)
  ) {
    args.push("--embed-thumbnail");
  }
  if (postProcessing.noEmbedThumbnail) args.push("--no-embed-thumbnail");

  // if (postProcessing.postprocessorArgs) {
  //   const ppArgs = buildPostProcessorArgs(postProcessing.postprocessorArgs)
  //   if (ppArgs) args.push('--postprocessor-args', ppArgs)
  // }

  if (postProcessing.keepVideo) args.push("--keep-video");
  if (postProcessing.noKeepVideo) args.push("--no-keep-video");
  if (postProcessing.postOverwrites) args.push("--post-overwrites");
  if (postProcessing.noPostOverwrites) args.push("--no-post-overwrites");
  if (postProcessing.embedMetadata) args.push("--embed-metadata");
  if (postProcessing.noEmbedMetadata) args.push("--no-embed-metadata");
  if (postProcessing.embedChapters) args.push("--embed-chapters");
  if (postProcessing.noEmbedChapters) args.push("--no-embed-chapters");
  if (postProcessing.embedInfoJson) args.push("--embed-info-json");
  if (postProcessing.noEmbedInfoJson) args.push("--no-embed-info-json");
  if (postProcessing.parseMetadata) args.push("--parse-metadata", postProcessing.parseMetadata);
  if (postProcessing.replaceInMetadata)
    args.push("--replace-in-metadata", postProcessing.replaceInMetadata);
  if (postProcessing.xattrs) args.push("--xattrs");
  if (postProcessing.concatPlaylist) args.push("--concat-playlist", postProcessing.concatPlaylist);
  if (postProcessing.fixup) args.push("--fixup", postProcessing.fixup);
  if (postProcessing.exec) args.push("--exec", postProcessing.exec);
  if (postProcessing.noExec) args.push("--no-exec");
  if (postProcessing.splitChapters) args.push("--split-chapters");
  if (postProcessing.noSplitChapters) args.push("--no-split-chapters");
  if (postProcessing.removeChapters) args.push("--remove-chapters", postProcessing.removeChapters);
  if (postProcessing.noRemoveChapters) args.push("--no-remove-chapters");
  if (postProcessing.forceKeyframesAtCuts) args.push("--force-keyframes-at-cuts");
  if (postProcessing.noForceKeyframesAtCuts) args.push("--no-force-keyframes-at-cuts");
  if (postProcessing.usePostprocessor)
    args.push("--use-postprocessor", postProcessing.usePostprocessor);

  return args;
};
