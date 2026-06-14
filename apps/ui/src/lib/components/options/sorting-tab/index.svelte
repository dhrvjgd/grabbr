<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Switch } from "$lib/components/ui/switch";
  import { Tooltip, TooltipContent, TooltipTrigger } from "$lib/components/ui/tooltip";
  import { preferences } from "$lib/preferences.svelte";
  import { InformationCircleIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import Codec from "./codec.svelte";

  const { enabled } = $derived(preferences.data.video.custom.videoFormat.formatSort);
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <div class="space-y-1">
      <div class="inline-flex items-center gap-1.5">
        <span class="font-medium">Sorting</span>
        <Tooltip>
          <TooltipTrigger class="cursor-help">
            <HugeiconsIcon icon={InformationCircleIcon} size={15} />
          </TooltipTrigger>
          <TooltipContent>
            <p>
              Sorting rules take priority over your selections (e.g., codec first, then resolution)
            </p>
            <p>
              You can use this to avoid re-encoding, but not all selected audio/video options may be
              respected
            </p>
          </TooltipContent>
        </Tooltip>
      </div>
      <div>
        <Switch
          checked={enabled}
          onCheckedChange={(value) => {
            preferences.update("video.custom.videoFormat.formatSort.enabled", value);
          }}
        />
      </div>
    </div>
    <Codec />
  </CardContent>
</Card>
