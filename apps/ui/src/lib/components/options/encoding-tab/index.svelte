<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";
  import { Switch } from "$lib/components/ui/switch";
  import { preferences } from "$lib/preferences.svelte";

  import Encoder from "./encoder.svelte";
  import VideoCodec from "./video-codec.svelte";

  const { enabled } = $derived(preferences.data.video.custom.postProcessing.postProcessorArgs);
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <div class="space-y-1">
      {#if !enabled}
        <p class="text-destructive mb-4 text-base">
          Note: Enabling this setting re-encodes the video, which is resource-intensive, can
          significantly slow down the download process, and may make your PC feel slow/laggy. If
          your PC has low-end specs, it's recommended to leave this option disabled and use an
          online converter instead.
        </p>
      {/if}
      <div class="font-medium">Encoding</div>
      <Switch
        checked={enabled}
        onCheckedChange={(value) => {
          preferences.update("video.custom.postProcessing.postProcessorArgs.enabled", value);
        }}
      />
    </div>
    {#if enabled}
      <Encoder />
      <VideoCodec />
      <!-- <Speed /> -->
      <!-- <Crf />  -->
    {/if}
  </CardContent>
</Card>
