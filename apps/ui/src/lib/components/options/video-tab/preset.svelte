<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { AiMagicIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  const { preset } = $derived(preferences.data.video);
</script>

<div class="space-y-1">
  <div class="font-medium">Preset</div>
  <ToggleGroup
    type="single"
    value={preset}
    onValueChange={(value) => {
      preferences.update("video.preset", value as "best" | "custom");
    }}
  >
    <Tooltip>
      <TooltipTrigger>
        {#snippet child({ props })}
          <ToggleGroupItem {...props} value="best">
            <span class="inline-flex items-center gap-1">
              <HugeiconsIcon icon={AiMagicIcon} />
              Best
            </span>
          </ToggleGroupItem>
        {/snippet}
      </TooltipTrigger>
      <TooltipContent>Source quality (in MP4)</TooltipContent>
    </Tooltip>
    <Tooltip>
      <TooltipTrigger
        >{#snippet child({ props })}
          <ToggleGroupItem {...props} value="custom">Custom</ToggleGroupItem>
        {/snippet}</TooltipTrigger
      >
      <TooltipContent>Full control over each setting</TooltipContent>
    </Tooltip>
  </ToggleGroup>
</div>
