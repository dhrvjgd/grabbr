import { AudioFormatEnum, AudioQualityEnum } from "@grabbr/contracts/enums";

export const formats = [
  {
    value: AudioFormatEnum.FLAC,
    name: "FLAC",
    fullName: "Free Lossless Audio Codec",
    size: "Medium",
    quality: "Lossless",
    compatibility: "Excellent",
  },
  {
    value: AudioFormatEnum.ALAC,
    name: "ALAC",
    fullName: "Apple Lossless Audio Codec",
    size: "Medium",
    quality: "Lossless",
    compatibility: "Excellent",
  },
  {
    value: AudioFormatEnum.WAV,
    name: "WAV",
    fullName: "Waveform Audio File Format",
    size: "Very Large",
    quality: "Lossless (Uncompressed)",
    compatibility: "Universal",
  },
  {
    value: AudioFormatEnum.OPUS,
    name: "OPUS",
    fullName: "OPUS",
    size: "Very Small",
    quality: "Very High",
    compatibility: "Good",
  },
  {
    value: AudioFormatEnum.M4A,
    name: "M4A",
    fullName: "MPEG-4 Audio",
    size: "Small",
    quality: "Very High",
    compatibility: "Excellent",
  },
  {
    value: AudioFormatEnum.MP3,
    name: "MP3",
    fullName: "MPEG Audio Layer III",
    size: "Small",
    quality: "Good",
    compatibility: "Universal",
  },
  {
    value: AudioFormatEnum.VORBIS,
    name: "VORBIS",
    fullName: "Ogg Vorbis",
    size: "Small",
    quality: "High",
    compatibility: "Good",
  },
] as const;

export const QUALITIES: { value: AudioQualityEnum; name: string }[] = [
  {
    value: AudioQualityEnum["320K"],
    name: "320K",
  },
  {
    value: AudioQualityEnum["256K"],
    name: "256K",
  },
  {
    value: AudioQualityEnum["224K"],
    name: "224K",
  },
  {
    value: AudioQualityEnum["192K"],
    name: "192K",
  },
  {
    value: AudioQualityEnum["160K"],
    name: "160K",
  },
  {
    value: AudioQualityEnum["128K"],
    name: "128K",
  },
  {
    value: AudioQualityEnum["96K"],
    name: "96K",
  },
  {
    value: AudioQualityEnum["64K"],
    name: "64K",
  },
] as const;
