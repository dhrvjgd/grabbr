<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { AudioFormatEnum } from "@grabbr/contracts/enums";

  import { formats } from "./constants";

  const { audioFormat } = $derived(preferences.data.audio.custom.postProcessing);

  const isBest = $derived(preferences.data.audio.preset === "best");
</script>

<div class="space-y-1">
  <div class={`${isBest && "opacity-50"} font-medium`}>Format</div>
  <ToggleGroup
    type="single"
    disabled={isBest}
    value={audioFormat}
    onValueChange={(value) => {
      preferences.update("audio.custom.postProcessing.audioFormat", value as AudioFormatEnum);
    }}
  >
    {#each formats as format}
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem {...props} value={format.value}>{format.name}</ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>{format.value}</TooltipContent>
      </Tooltip>
    {/each}
  </ToggleGroup>
</div>
