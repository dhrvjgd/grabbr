<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { AiMagicIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  const { preset } = $derived(preferences.data.audio);
</script>

<div class="space-y-1">
  <div class="font-medium">Preset</div>
  <ToggleGroup
    type="single"
    value={preset}
    onValueChange={(value) => {
      preferences.update("audio.preset", value as "best" | "custom");
    }}
  >
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem {...props} value="best">
            <HugeiconsIcon icon={AiMagicIcon} />
            Best
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent>Source quality (in MP3)</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem {...props} value="custom">Custom</ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent>Full control over each setting</TooltipContent>
    </Tooltip>
  </ToggleGroup>
</div>
