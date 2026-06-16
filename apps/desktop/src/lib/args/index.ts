import { FFMPEG } from "../binary-paths";
import { store } from "../store";
import { buildAudioArgs } from "./audio";
import { buildBaseArgs } from "./base";
import { buildVideoArgs } from "./video";

export const buildArgs = (url: string) => {
  const { type, base, audio, video } = store.all;

  const defaultArgs = [
    "--print",
    "before_dl:%(title)s",
    "--print",
    "after_move:filepath",
    "--ffmpeg-location",
    FFMPEG,
  ];
  const baseArgs = buildBaseArgs(base);
  const typeArgs = type === "audio" ? buildAudioArgs(audio) : buildVideoArgs(video);

  console.info(`Default args: ${defaultArgs.join(" ")}`);
  console.info(`Type args: ${typeArgs.join(" ")}`);
  console.info(`URL: ${url}`);

  return [...defaultArgs, ...baseArgs, ...typeArgs, url];
};
