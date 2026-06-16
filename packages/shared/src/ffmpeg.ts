export const enum FFmpegTargetEnum {
  FFMPEG = "ffmpeg:",
  MERGER_FFMPEG = "Merger+ffmpeg:",
  EXTRACT_AUDIO_FFMPEG = "ExtractAudio+ffmpeg:",
  EMBED_THUMBNAIL_FFMPEG = "EmbedThumbnail+ffmpeg:",
  EMBED_SUBTITLE_FFMPEG = "EmbedSubtitle+ffmpeg:",
  VIDEO_REMUXER_FFMPEG = "VideoRemuxer+ffmpeg:",
  VIDEO_CONVERTOR_FFMPEG = "VideoConvertor+ffmpeg:",
}

export const enum FFmpegEncoderEnum {
  CPU = "cpu",
  NVIDIA = "nvenc",
  AMD = "amf",
  INTEL = "qsv",
}

export const enum FFmpegVCodecCPUEnum {
  LIBX264 = "libx264",
  LIBX265 = "libx265",
}

export const enum FFmpegVCodecNVIDIAEnum {
  H264_NVENC = "h264_nvenc",
  HEVC_NVENC = "hevc_nvenc",
}

export const enum FFmpegVCodecAMFEnum {
  H264_AMF = "h264_amf",
  HEVC_AMF = "hevc_amf",
}

export const enum FFmpegVCodecQSVEnum {
  H264_QSV = "h264_qsv",
  HEVC_QSV = "hevc_qsv",
}

export const enum FFmpegACodecEnum {
  AAC = "aac",
  LIBMP3LAME = "libmp3lame",
  LIBOPUS = "libopus",
  LIBVORBIS = "libvorbis",
  FLAC = "flac",
  COPY = "copy",
}

export const enum FFmpegPresetCPUEnum {
  ULTRAFAST = "ultrafast",
  SUPERFAST = "superfast",
  VERYFAST = "veryfast",
  FASTER = "faster",
  FAST = "fast",
  MEDIUM = "medium",
  SLOW = "slow",
  SLOWER = "slower",
  VERYSLOW = "veryslow",
}

export const enum FFmpegPresetNVENCEnum {
  P1 = "p1",
  P2 = "p2",
  P3 = "p3",
  P4 = "p4",
  P5 = "p5",
  P6 = "p6",
  P7 = "p7",
}

export const enum FFmpegPresetAMFEnum {
  speed = "speed",
  balanced = "balanced",
  quality = "quality",
}

export const enum FFmpegPresetQSVEnum {
  veryfast = "veryfast",
  faster = "faster",
  fast = "fast",
  medium = "medium",
  slow = "slow",
}

export type FFmpegAPI = {
  enabled: boolean;
  target: FFmpegTargetEnum;
  audioCodec: FFmpegACodecEnum;
  encoder: FFmpegEncoderEnum;
  [FFmpegEncoderEnum.CPU]: {
    videoCodec: FFmpegVCodecCPUEnum;
    preset: FFmpegPresetCPUEnum;
    crf: number; // 0-51, h264 default: 23, h265 default: 28
  };
  [FFmpegEncoderEnum.NVIDIA]: {
    videoCodec: FFmpegVCodecNVIDIAEnum;
    preset: FFmpegPresetNVENCEnum;
    cq: number; // 0-51, default: 0 (means FFmpeg lets NVENC decide)
  };
  [FFmpegEncoderEnum.AMD]: {
    videoCodec: FFmpegVCodecAMFEnum;
    preset: FFmpegPresetAMFEnum;
    qp: number; // 0-51, default: -1 (means AMF picks internally)
  };
  [FFmpegEncoderEnum.INTEL]: {
    videoCodec: FFmpegVCodecQSVEnum;
    preset: FFmpegPresetQSVEnum;
    globalQuality: number; // 1-51, default: 25
  };
};
