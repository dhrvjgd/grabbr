<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";

  import Format from "./format.svelte";
  import Preset from "./preset.svelte";
  import Quality from "./quality.svelte";
  import Switches from "./switches.svelte";
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <Preset />
    <Format />
    <Quality />
    <Switches />
  </CardContent>
</Card>
