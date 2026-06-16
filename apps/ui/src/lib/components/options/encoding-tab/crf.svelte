<!-- <script lang="ts">
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { preferences } from "$lib/states/preferences.svelte";
    import { InformationCircleIcon } from "@hugeicons/core-free-icons";
    import { HugeiconsIcon } from "@hugeicons/svelte";

</script>
<div class="space-y-2 max-w-7/12">
      <div class="flex justify-between">
        <div class="inline-flex items-center gap-1.5">
          <span class="font-medium">Quality (CRF)</span>
          <Tooltip>
            <TooltipTrigger class="cursor-help">
              <HugeiconsIcon icon={InformationCircleIcon} size={15} />
            </TooltipTrigger>
            <TooltipContent>
              <p class="underline underline-offset-4 decoration-muted-foreground mb-1 font-medium">
                Constant Rate Factor
              </p>
              <p>Lower CRF = Better quality, Larger file</p>
              <p>Higher CRF = Lower quality, More compression</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span
          class={crf > 5 ? 'text-destructive' : crf > 2 ? 'text-orange-400' : 'text-green-400'}
        >
          {crf === 23 && <span class="text-muted-foreground">(Default) </span>}
          {crf}
        </span>
      </div>
      <Slider
        min={0}
        max={51}
        value={crf}
        onValueChange={function (index) {
          const i = index as number
          setCrf(i)
        }}
        onValueCommitted={function (index) {
          const i = index as number

          if (preferences.data.video.custom.postProcessing.postProcessorArgs.crf !== i) {
            preferences.update('video.custom.postProcessing.postProcessorArgs.crf', i)
          }
        }}
      />
    </div> -->
