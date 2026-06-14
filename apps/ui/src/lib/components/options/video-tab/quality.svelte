<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";

  const QUALITIES = [
    {
      value: "bv+ba/best",
      name: "Peak",
      content: "Peak available",
    },
    {
      value: "bv[height<=4320]+ba/best",
      name: "4320p",
      content: "UHD (8K)",
    },
    {
      value: "bv[height<=2160]+ba/best",
      name: "2160p",
      content: "UHD (4K)",
    },
    {
      value: "bv[height<=1440]+ba/best",
      name: "1440p",
      content: "QHD",
    },
    {
      value: "bv[height<=1080]+ba/best",
      name: "1080p",
      content: "FHD",
    },
    {
      value: "bv[height<=720]+ba/best",
      name: "720p",
      content: "HD",
    },
    {
      value: "bv[height<=480]+ba/best",
      name: "480p",
      content: "SD",
    },
    {
      value: "bv[height<=360]+ba/best",
      name: "360p",
      content: "SD",
    },
    {
      value: "bv[height<=240]+ba/best",
      name: "240p",
      content: "Low",
    },
    {
      value: "bv[height<=144]+ba/best",
      name: "144p",
      content: "Very Low",
    },
  ];

  const { format } = $derived(preferences.data.video.custom.videoFormat);

  const isBest = $derived(preferences.data.video.preset === "best");
</script>

<div class="space-y-1">
  <div class={`${isBest && "opacity-50"} font-medium`}>Quality</div>
  <ToggleGroup
    type="single"
    disabled={isBest}
    value={format}
    onValueChange={(value) => {
      preferences.update("video.custom.videoFormat.format", value);
    }}
  >
    {#each QUALITIES as quality}
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem {...props} value={quality.value}>{quality.name}</ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>{quality.content}</TooltipContent>
      </Tooltip>
    {/each}
  </ToggleGroup>
</div>
