<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { VideoMergeOutputFormatEnum } from "@grabbr/contracts/enums";

  const { mergeOutputFormat } = $derived(preferences.data.video.custom.videoFormat);

  const isBest = $derived(preferences.data.video.preset === "best");

  const CONTAINERS: {
    value: VideoMergeOutputFormatEnum;
    name: string;
    content: string;
  }[] = [
    {
      value: VideoMergeOutputFormatEnum.MP4,
      name: "MP4",
      content: `
      <p class="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
        MPEG-4 Part 14
      </p>
      <p>Compatibility: Universal</p>
      <p>Flexibility: Good</p>
    `,
    },
    {
      value: VideoMergeOutputFormatEnum.MKV,
      name: "MKV",
      content: `
      <p class="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
        Matroska Video
      </p>
      <p>Compatibility: Moderate</p>
      <p>Flexibility: Excellent</p>
    `,
    },
  ];
</script>

<div class="space-y-1">
  <div class={`${isBest && "opacity-50"} font-medium`}>Container</div>
  <ToggleGroup
    type="single"
    disabled={isBest}
    value={mergeOutputFormat}
    onValueChange={(value) => {
      preferences.update(
        "video.custom.videoFormat.mergeOutputFormat",
        value as VideoMergeOutputFormatEnum,
      );
    }}
  >
    {#each CONTAINERS as container}
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem {...props} value={container.value}>{container.name}</ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>{@html container.content}</TooltipContent>
      </Tooltip>
    {/each}
  </ToggleGroup>
</div>
