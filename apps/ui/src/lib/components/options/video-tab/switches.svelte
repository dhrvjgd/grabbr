<script lang="ts">
  import { Switch } from "$lib/components/ui/switch";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { THUMB_EMBED_VIDEO_FMTS } from "@grabbr/contracts/enums";
  import { InformationCircleIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  const { mergeOutputFormat } = preferences.data.video.custom.videoFormat;
  const { embedThumbnail, embedChapters, embedMetadata } =
    preferences.data.video.custom.postProcessing;

  const isBest = $derived(preferences.data.video.preset === "best");
  const isThumbnailConfigurable = $derived(THUMB_EMBED_VIDEO_FMTS.includes(mergeOutputFormat));
</script>

<div class="space-y-1.5">
  <div
    class={`${(isBest || !isThumbnailConfigurable) && "opacity-50"} inline-flex items-center gap-1.5`}
  >
    <span class="font-medium">Embed Thumbnail</span>
    <Tooltip disabled={isBest || !isThumbnailConfigurable}>
      <TooltipTrigger class={`${!isBest && isThumbnailConfigurable && "cursor-help"}`}>
        <HugeiconsIcon icon={InformationCircleIcon} size={16} />
      </TooltipTrigger>
      <TooltipContent>
        Supported containers:{" "}
        <span class="font-medium">
          {THUMB_EMBED_VIDEO_FMTS.toString().replaceAll(",", ", ").toUpperCase()}
        </span>
      </TooltipContent>
    </Tooltip>
  </div>
  <div>
    <Switch
      checked={embedThumbnail}
      onCheckedChange={(value) => {
        preferences.update("video.custom.postProcessing.embedThumbnail", value);
      }}
      disabled={isBest || !isThumbnailConfigurable}
    />
  </div>
</div>
<div class="space-y-1.5">
  <div class={`${isBest && "opacity-50"} inline-flex items-center gap-1.5`}>
    <span class="font-medium">Embed Chapters</span>
    <Tooltip disabled={isBest}>
      <TooltipTrigger class={`${!isBest && "cursor-help"}`}>
        <HugeiconsIcon icon={InformationCircleIcon} size={16} />
      </TooltipTrigger>
      <TooltipContent>Adds the video&apos;s timestamped sections</TooltipContent>
    </Tooltip>
  </div>
  <div>
    <Switch
      checked={embedChapters}
      onCheckedChange={(value) => {
        preferences.update("video.custom.postProcessing.embedChapters", value);
      }}
      disabled={isBest}
    />
  </div>
</div>
<div class="space-y-1.5">
  <div class={`${isBest && "opacity-50"} font-medium`}>Embed Metadata</div>
  <div>
    <Switch
      checked={embedMetadata}
      onCheckedChange={(value) => {
        preferences.update("video.custom.postProcessing.embedMetadata", value);
      }}
      disabled={isBest}
    />
  </div>
</div>
