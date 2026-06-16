import {
  FFmpegACodecEnum,
  FFmpegEncoderEnum,
  FFmpegPresetAMFEnum,
  FFmpegPresetCPUEnum,
  FFmpegPresetNVENCEnum,
  FFmpegPresetQSVEnum,
  FFmpegTargetEnum,
  FFmpegVCodecAMFEnum,
  FFmpegVCodecCPUEnum,
  FFmpegVCodecNVIDIAEnum,
  FFmpegVCodecQSVEnum,
} from "./ffmpeg";
import type { DeepKeyOf, DeepValue } from "./utils";
import {
  AudioFormatEnum,
  AudioQualityEnum,
  JsRuntimesEnum,
  VideoCodecEnum,
  VideoMergeOutputFormatEnum,
  type AudioPreferences,
  type BasePreferences,
  type VideoPreferences,
} from "./ytdlp";

export type Preferences = {
  type: MediaTypeEnum;
  downloadMode: DownloadModeEnum;
  supportedEncoders: FFmpegEncoderEnum[];
  appVersion: string;
  base: BasePreferences;
  audio: AudioPreferences;
  video: VideoPreferences;
};

export type PreferenceMap = {
  [K in DeepKeyOf<Preferences>]: DeepValue<Preferences, K>;
};

export const enum MediaTypeEnum {
  AUDIO = "audio",
  VIDEO = "video",
}

export const enum DownloadModeEnum {
  ASK = "ask",
  SELECT = "select",
}

export const DefaultPreferences: Readonly<Preferences> = {
  type: MediaTypeEnum.AUDIO,
  downloadMode: DownloadModeEnum.ASK,
  supportedEncoders: [FFmpegEncoderEnum.CPU],
  appVersion: "x.x.x",
  base: {
    general: { jsRuntimes: JsRuntimesEnum.BUN },
    filesystem: {
      noOverwrites: true,
      noPart: true,
      restrictFilenames: true,
      output: "",
    },
    videoSelection: { noPlaylist: true },
  },
  audio: {
    preset: "best",
    custom: {
      postProcessing: {
        audioFormat: AudioFormatEnum.WAV,
        audioQuality: AudioQualityEnum.ZERO,
        embedThumbnail: true,
        embedMetadata: true,
        embedChapters: true,
        postOverwrites: true,
      },
    },
  },
  video: {
    preset: "best",
    custom: {
      videoFormat: {
        format: "bv+ba/best",
        mergeOutputFormat: VideoMergeOutputFormatEnum.MP4,
        formatSort: {
          enabled: false,
          vcodec: VideoCodecEnum.H264,
        },
      },
      postProcessing: {
        embedThumbnail: true,
        embedMetadata: true,
        embedChapters: true,
        embedSubs: true,
        postOverwrites: true,
        postProcessorArgs: {
          enabled: false,
          target: FFmpegTargetEnum.FFMPEG,
          audioCodec: FFmpegACodecEnum.AAC,
          encoder: FFmpegEncoderEnum.CPU,
          cpu: {
            preset: FFmpegPresetCPUEnum.ULTRAFAST,
            videoCodec: FFmpegVCodecCPUEnum.LIBX264,
            crf: 23,
          },
          nvenc: {
            preset: FFmpegPresetNVENCEnum.P1,
            videoCodec: FFmpegVCodecNVIDIAEnum.H264_NVENC,
            cq: 0,
          },
          amf: {
            preset: FFmpegPresetAMFEnum.speed,
            videoCodec: FFmpegVCodecAMFEnum.H264_AMF,
            qp: -1,
          },
          qsv: {
            preset: FFmpegPresetQSVEnum.veryfast,
            videoCodec: FFmpegVCodecQSVEnum.H264_QSV,
            globalQuality: 25,
          },
        },
      },
    },
  },
} as const;
