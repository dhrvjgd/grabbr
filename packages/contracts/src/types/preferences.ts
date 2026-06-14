import type { FFmpegEncoderEnum } from "../enums";
import type { DownloadModeEnum, MediaTypeEnum } from "../enums";
import type { AudioPreferences, BasePreferences, VideoPreferences } from "./ytdlp";

export type Preferences = {
  type: MediaTypeEnum;
  downloadMode: DownloadModeEnum;
  supportedEncoders: FFmpegEncoderEnum[];
  appVersion: string;
  base: BasePreferences;
  audio: AudioPreferences;
  video: VideoPreferences;
};

export type DeepKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object ? K | `${K}.${DeepKeyOf<T[K]>}` : K;
}[keyof T & string];

export type DeepValue<T, K extends string> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? DeepValue<T[A], B>
    : never
  : K extends keyof T
    ? T[K]
    : never;

export type PreferenceMap = {
  [K in DeepKeyOf<Preferences>]: DeepValue<Preferences, K>;
};
