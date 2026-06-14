<!-- <script lang="ts">
    import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
    import { preferences } from "$lib/states/preferences.svelte";
    import { InformationCircleIcon } from "@hugeicons/core-free-icons";
    import { HugeiconsIcon } from "@hugeicons/svelte";

const SPEEDS: {
   value: VideoPreferences['custom']['postProcessing']['postProcessorArgs']['preset']
   name: string
 }[] = [
   {
     value: FFmpegPresetEnum.ULTRAFAST,
     name: 'Ultra Fast'
   },
   {
     value: FFmpegPresetEnum.SUPERFAST,
     name: 'Super Fast'
   },
   {
     value: FFmpegPresetEnum.VERYFAST,
     name: 'Very Fast'
   },
   {
     value: FFmpegPresetEnum.FASTER,
     name: 'Faster'
   },
   {
     value: FFmpegPresetEnum.FAST,
     name: 'Fast'
   },
   {
     value: FFmpegPresetEnum.MEDIUM,
     name: 'Medium'
   },
   {
     value: FFmpegPresetEnum.SLOW,
     name: 'Slow'
   },
   {
     value: FFmpegPresetEnum.SLOWER,
     name: 'Slower'
   },
   {
     value: FFmpegPresetEnum.VERYSLOW,
     name: 'Very Slow'
   }
 ]
</script>
 <div class="space-y-2 max-w-7/12">
      <div class="flex justify-between">
        <div class="inline-flex items-center gap-1.5">
          <span class="font-medium">Speed</span>
          <Tooltip>
            <TooltipTrigger class="cursor-help">
              <HugeiconsIcon icon={InformationCircleIcon} size={15} />
            </TooltipTrigger>
            <TooltipContent>
              <p>Faster encoding = Less compression, Larger file</p>
              <p>Slower encoding = More compression, Smaller file</p>
            </TooltipContent>
          </Tooltip>
        </div>
        <span
          class={
            currSpeedIdx > 5
              ? 'text-destructive'
              : currSpeedIdx > 2
                ? 'text-orange-400'
                : 'text-green-400'
          }
        >
          {currSpeedIdx === 0 && <span class="text-muted-foreground">(Default) </span>}
          {SPEEDS[currSpeedIdx].name}
        </span>
      </div>
      <Slider
        max={SPEEDS.length - 1}
        value={currSpeedIdx}
        onValueChange={function (index) {
          const i = index as number
          setCurrSpeedIdx(i)
        }}
        onValueCommitted={function (index) {
          const i = index as number
          const speed = SPEEDS[i].value

          if (preferences.data.video.custom.postProcessing.postProcessorArgs.preset !== speed) {
            preferences.update('video.custom.postProcessing.postProcessorArgs.preset', speed)
          }
        }}
      />
    </div> -->
