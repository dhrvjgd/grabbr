<script lang="ts">
  import { ToggleGroup, ToggleGroupItem } from "$lib/components/ui/toggle-group";
  import { preferences } from "$lib/preferences.svelte";
  import { VideoCodecEnum } from "@grabbr/contracts/enums";

  const CONTAINERS: { value: VideoCodecEnum; name: string }[] = [
    {
      value: VideoCodecEnum.H264,
      name: "H264",
    },
    {
      value: VideoCodecEnum.H265,
      name: "H265",
    },
  ];

  const { enabled, vcodec } = $derived(preferences.data.video.custom.videoFormat.formatSort);
</script>

<div class="space-y-1">
  <div class={`${!enabled && "opacity-50"} font-medium`}>Codec</div>
  <ToggleGroup
    type="single"
    disabled={!enabled}
    value={vcodec}
    onValueChange={(value) => {
      preferences.update("video.custom.videoFormat.formatSort.vcodec", value as VideoCodecEnum);
    }}
  >
    {#each CONTAINERS as container}
      <ToggleGroupItem value={container.value}>
        {container.name}
      </ToggleGroupItem>
    {/each}
  </ToggleGroup>
</div>
