<script lang="ts">
  import { preferences } from "$lib/preferences.svelte";
  import { MediaTypeEnum } from "@grabbr/shared/preferences";
  import { FlimSlateIcon, MusicNote04Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import { ToggleGroup, ToggleGroupItem } from "./ui/toggle-group";
</script>

<ToggleGroup
  type="single"
  value={preferences.data.type}
  onValueChange={(value) => {
    preferences.update("type", value as MediaTypeEnum);
  }}
>
  <ToggleGroupItem value={MediaTypeEnum.AUDIO}>
    <HugeiconsIcon icon={MusicNote04Icon} className="mr-0.5" />
    Audio
  </ToggleGroupItem>
  <ToggleGroupItem value={MediaTypeEnum.VIDEO}>
    <HugeiconsIcon icon={FlimSlateIcon} className="size-4.5 mr-0.5" />
    Video
  </ToggleGroupItem>
</ToggleGroup>
