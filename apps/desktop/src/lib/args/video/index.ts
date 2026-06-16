import {
  THUMB_EMBED_VIDEO_FMTS,
  VideoMergeOutputFormatEnum,
  type VideoPreferences,
} from "@grabbr/shared/ytdlp";

import { buildPostProcessorArgs } from "./post-processor";
import { buildFormatSortArgs } from "./sorting";

export const buildVideoArgs = (video: VideoPreferences) => {
  const args: string[] = [];

  if (video.preset === "best") {
    args.push(
      "-f",
      "bestvideo+bestaudio/best",
      "--merge-output-format",
      VideoMergeOutputFormatEnum.MP4,
      "--embed-thumbnail",
      "--embed-metadata",
      "--embed-chapters",
      "--embed-subs",
    );

    return args;
  }

  const { videoFormat, subtitle, postProcessing } = video.custom;

  args.push("--format", videoFormat.format);
  if (videoFormat.formatSort.enabled) {
    const sortArgs = buildFormatSortArgs(videoFormat.formatSort);
    args.push("--format-sort", sortArgs);
  }
  if (videoFormat.formatSortReset) args.push("--format-sort-reset");
  if (videoFormat.formatSortForce) args.push("--format-sort-force");
  if (videoFormat.noFormatSortForce) args.push("--no-format-sort-force");
  if (videoFormat.videoMultistreams) args.push("--video-multistreams");
  if (videoFormat.noVideoMultistreams) args.push("--no-video-multistreams");
  if (videoFormat.audioMultistreams) args.push("--audio-multistreams");
  if (videoFormat.noAudioMultistreams) args.push("--no-audio-multistreams");
  if (videoFormat.preferFreeFormats) args.push("--prefer-free-formats");
  if (videoFormat.noPreferFreeFormats) args.push("--no-prefer-free-formats");
  if (videoFormat.checkFormats) args.push("--check-formats");
  if (videoFormat.checkAllFormats) args.push("--check-all-formats");
  if (videoFormat.noCheckFormats) args.push("--no-check-formats");
  if (videoFormat.listFormats) args.push("--list-formats");
  args.push("--merge-output-format", videoFormat.mergeOutputFormat);

  // RE-ENCODING for MOV as appropriate codecs are required
  // if (videoFormat.mergeOutputFormat === VideoMergeOutputFormatEnum.MOV) {
  //   args.push('--postprocessor-args', 'ffmpeg:-c:v libx264 -c:a aac -movflags +faststart')
  // }

  if (subtitle) {
    if (subtitle.writeSubs) args.push("--write-subs");
    if (subtitle.noWriteSubs) args.push("--no-write-subs");
    if (subtitle.writeAutoSubs) args.push("--write-auto-subs");
    if (subtitle.noWriteAutoSubs) args.push("--no-write-auto-subs");
    if (subtitle.listSubs) args.push("--list-subs");
    if (subtitle.subFormat) args.push("--sub-format", subtitle.subFormat);
    if (subtitle.subLangs) args.push("--sub-langs", subtitle.subLangs);
  }

  if (postProcessing.remuxVideo) args.push("--remux-video", postProcessing.remuxVideo);
  if (postProcessing.recodeVideo) args.push("--recode-video", postProcessing.recodeVideo);
  if (postProcessing.keepVideo) args.push("--keep-video");
  if (postProcessing.noKeepVideo) args.push("--no-keep-video");
  if (postProcessing.postOverwrites) args.push("--post-overwrites");
  if (postProcessing.noPostOverwrites) args.push("--no-post-overwrites");
  if (postProcessing.embedSubs) args.push("--embed-subs");
  if (postProcessing.noEmbedSubs) args.push("--no-embed-subs");
  if (
    postProcessing.embedThumbnail &&
    THUMB_EMBED_VIDEO_FMTS.includes(videoFormat.mergeOutputFormat)
  )
    args.push("--embed-thumbnail");
  if (postProcessing.noEmbedThumbnail) args.push("--no-embed-thumbnail");
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
  if (postProcessing.convertSubs) args.push("--convert-subs", postProcessing.convertSubs);
  if (postProcessing.convertThumbnails)
    args.push("--convert-thumbnails", postProcessing.convertThumbnails);
  if (postProcessing.splitChapters) args.push("--split-chapters");
  if (postProcessing.noSplitChapters) args.push("--no-split-chapters");
  if (postProcessing.removeChapters) args.push("--remove-chapters", postProcessing.removeChapters);
  if (postProcessing.noRemoveChapters) args.push("--no-remove-chapters");
  if (postProcessing.forceKeyframesAtCuts) args.push("--force-keyframes-at-cuts");
  if (postProcessing.noForceKeyframesAtCuts) args.push("--no-force-keyframes-at-cuts");
  if (postProcessing.usePostprocessor)
    args.push("--use-postprocessor", postProcessing.usePostprocessor);

  if (postProcessing.postProcessorArgs.enabled) {
    const ppArgs = buildPostProcessorArgs(postProcessing.postProcessorArgs);
    args.push("--postprocessor-args", ppArgs);
  }

  return args;
};
