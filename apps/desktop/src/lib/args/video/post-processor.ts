import { FFmpegEncoderEnum, FFmpegVCodecCPUEnum, type FFmpegAPI } from "@grabbr/shared/ffmpeg";

export const buildPostProcessorArgs = (ppa: FFmpegAPI) => {
  const args: string[] = [];

  args.push(`-c:a ${ppa.audioCodec}`);

  switch (ppa.encoder) {
    case FFmpegEncoderEnum.CPU: {
      const { videoCodec, preset, crf } = ppa[FFmpegEncoderEnum.CPU];
      const defaultCrf = videoCodec === FFmpegVCodecCPUEnum.LIBX264 ? 23 : 28;

      args.push(`-c:v ${videoCodec}`);
      args.push(`-preset ${preset}`);
      if (crf !== defaultCrf) args.push(`-crf ${crf}`);
      break;
    }

    case FFmpegEncoderEnum.NVIDIA: {
      const { videoCodec, preset, cq } = ppa[FFmpegEncoderEnum.NVIDIA];

      args.push(`-c:v ${videoCodec}`);
      args.push(`-preset ${preset}`);
      if (cq !== 0) args.push(`-cq ${cq}`);
      break;
    }

    case FFmpegEncoderEnum.AMD: {
      const { videoCodec, preset, qp } = ppa[FFmpegEncoderEnum.AMD];

      args.push(`-c:v ${videoCodec}`);
      args.push(`-preset ${preset}`);
      if (qp !== -1) args.push(`-qp ${qp}`);
      break;
    }

    case FFmpegEncoderEnum.INTEL: {
      const { videoCodec, preset, globalQuality } = ppa[FFmpegEncoderEnum.INTEL];

      args.push(`-c:v ${videoCodec}`);
      args.push(`-preset ${preset}`);
      if (globalQuality !== 25) args.push(`-global_quality ${globalQuality}`);
      break;
    }
  }

  return `${ppa.target}${args.join(" ")}`;
};
