<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { FFmpegEncoderEnum } from "@grabbr/contracts/enums";

  const { encoder } = $derived(preferences.data.video.custom.postProcessing.postProcessorArgs);
</script>

<div class="space-y-1">
  <div class="font-medium">Encoder</div>
  <ToggleGroup
    type="single"
    value={encoder}
    onValueChange={(value) => {
      preferences.update(
        "video.custom.postProcessing.postProcessorArgs.encoder",
        value as FFmpegEncoderEnum,
      );
    }}
  >
    {#each preferences.data.supportedEncoders as encoder}
      <Tooltip>
        <TooltipTrigger>
          {#snippet child({ props })}
            <ToggleGroupItem {...props} value={encoder}>
              {#if encoder === FFmpegEncoderEnum.NVIDIA}
                "NVIDIA"
              {:else if encoder === FFmpegEncoderEnum.AMD}
                "AMD"
              {:else if encoder === FFmpegEncoderEnum.INTEL}
                "Intel"
              {:else}
                "CPU"
              {/if}
            </ToggleGroupItem>
          {/snippet}
        </TooltipTrigger>
        <TooltipContent>
          {#if encoder === FFmpegEncoderEnum.NVIDIA || encoder === FFmpegEncoderEnum.AMD}
            4x - 5x faster
          {:else if encoder === FFmpegEncoderEnum.INTEL}
            Not recommended
          {:else}
            Default
          {/if}
        </TooltipContent>
      </Tooltip>
      )
    {/each}
  </ToggleGroup>
</div>
