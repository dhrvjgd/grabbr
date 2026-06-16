<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { AudioQualityEnum, QLTY_CHNG_AUDIO_FMTS } from "@grabbr/shared/ytdlp";
  import { InformationCircleIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import { QUALITIES } from "./constants";

  const { audioFormat, audioQuality } = $derived(preferences.data.audio.custom.postProcessing);

  const isBest = $derived(preferences.data.audio.preset === "best");
  const isQualityConfigurable = $derived(QLTY_CHNG_AUDIO_FMTS.includes(audioFormat));
</script>

<div class="space-y-1">
  <div
    class={`${(isBest || !isQualityConfigurable) && "opacity-50"} inline-flex items-center gap-1.5`}
  >
    <span class="font-medium">Quality</span>
    <Tooltip disabled={isBest}>
      <TooltipTrigger class={`${!isBest && "cursor-help"}`}>
        <HugeiconsIcon icon={InformationCircleIcon} size={14} />
      </TooltipTrigger>
      <TooltipContent>
        Supported formats:{" "}
        <span class="font-medium">
          {QLTY_CHNG_AUDIO_FMTS.toString().replaceAll(",", ", ").toUpperCase()}
        </span>
      </TooltipContent>
    </Tooltip>
  </div>
  <ToggleGroup
    type="single"
    disabled={!isQualityConfigurable || isBest}
    value={audioQuality}
    onValueChange={(value) => {
      preferences.update("audio.custom.postProcessing.audioQuality", value as AudioQualityEnum);
    }}
  >
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem {...props} value="0">Peak</ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent>Peak available</TooltipContent>
    </Tooltip>
    {#each QUALITIES as quality}
      <ToggleGroupItem value={quality.value}>
        {quality.name}
      </ToggleGroupItem>
    {/each}
  </ToggleGroup>
</div>
