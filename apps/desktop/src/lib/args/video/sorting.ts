import type { VideoPreferences } from "@grabbr/contracts/types";

export const buildFormatSortArgs = (
  fs: VideoPreferences["custom"]["videoFormat"]["formatSort"],
) => {
  const args: string[] = [];

  if (fs.hasVid) args.push("hasvid");
  if (fs.hasAud) args.push("hasaud");
  if (fs.iePref) args.push(`ie_pref:${fs.iePref}`);
  if (fs.lang) args.push(`lang:${fs.lang}`);
  if (fs.quality) args.push(`quality:${fs.quality}`);
  if (fs.source) args.push(`source:${fs.source}`);
  if (fs.proto) args.push(`proto:${fs.proto}`);
  args.push(`vcodec:${fs.vcodec}`);
  if (fs.acodec) args.push(`acodec:${fs.acodec}`);
  if (fs.vext) args.push(`vext:${fs.vext}`);
  if (fs.aext) args.push(`aext:${fs.aext}`);
  if (fs.ext) args.push(`ext:${fs.ext}`);
  if (fs.filesize) args.push(`filesize:${fs.filesize}`);
  if (fs.fsApprox) args.push(`fs_approx:${fs.fsApprox}`);
  if (fs.height) args.push(`height:${fs.height}`);
  if (fs.width) args.push(`width:${fs.width}`);
  if (fs.res) args.push(`res:${fs.res}`);
  if (fs.fps) args.push(`fps:${fs.fps}`);
  if (fs.hdr) args.push(`hdr:${fs.hdr}`);
  if (fs.channels) args.push(`channels:${fs.channels}`);
  if (fs.tbr) args.push(`tbr:${fs.tbr}`);
  if (fs.vbr) args.push(`vbr:${fs.vbr}`);
  if (fs.abr) args.push(`abr:${fs.abr}`);
  if (fs.br) args.push(`br:${fs.br}`);
  if (fs.asr) args.push(`asr:${fs.asr}`);

  return `--format-sort ${args.join(",")}`;
};
