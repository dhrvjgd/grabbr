<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import {
    FFmpegEncoderEnum,
    FFmpegVCodecAMFEnum,
    FFmpegVCodecCPUEnum,
    FFmpegVCodecNVIDIAEnum,
    FFmpegVCodecQSVEnum,
  } from "@grabbr/shared/ffmpeg";

  const CODECS = {
    [FFmpegEncoderEnum.CPU]: [
      { label: "H264", value: FFmpegVCodecCPUEnum.LIBX264 },
      { label: "H265", value: FFmpegVCodecCPUEnum.LIBX265 },
    ],
    [FFmpegEncoderEnum.NVIDIA]: [
      { label: "H264", value: FFmpegVCodecNVIDIAEnum.H264_NVENC },
      { label: "H265", value: FFmpegVCodecNVIDIAEnum.HEVC_NVENC },
    ],
    [FFmpegEncoderEnum.AMD]: [
      { label: "H264", value: FFmpegVCodecAMFEnum.H264_AMF },
      { label: "H265", value: FFmpegVCodecAMFEnum.HEVC_AMF },
    ],
    [FFmpegEncoderEnum.INTEL]: [
      { label: "H264", value: FFmpegVCodecQSVEnum.H264_QSV },
      { label: "H265", value: FFmpegVCodecQSVEnum.HEVC_QSV },
    ],
  };

  const vCodec = $derived(
    preferences.data.video.custom.postProcessing.postProcessorArgs[
      preferences.data.video.custom.postProcessing.postProcessorArgs.encoder
    ].videoCodec,
  );
  const options = $derived(
    CODECS[preferences.data.video.custom.postProcessing.postProcessorArgs.encoder],
  );
</script>

<div class="space-y-1">
  <div class="font-medium">Video Codec</div>
  <ToggleGroup
    type="single"
    value={vCodec}
    onValueChange={(value) => {
      preferences.update(
        `video.custom.postProcessing.postProcessorArgs.${preferences.data.video.custom.postProcessing.postProcessorArgs.encoder}.videoCodec`,
        value as never,
      );
    }}
  >
    {#each options as { label, value }}
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem {...props} {value}>{label}</ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>{label}</TooltipContent>
      </Tooltip>
    {/each}
  </ToggleGroup>
</div>
