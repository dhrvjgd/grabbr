import { AudioFormatEnum, VideoMergeOutputFormatEnum } from "./ytdlp";

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
