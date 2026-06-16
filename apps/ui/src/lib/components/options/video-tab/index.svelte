<script lang="ts">
  import { Card, CardContent } from "$lib/components/ui/card";

  import Container from "./container.svelte";
  import Preset from "./preset.svelte";
  import Quality from "./quality.svelte";
  import Switches from "./switches.svelte";
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <Preset />
    <Quality />
    <Container />
    <Switches />
  </CardContent>
</Card>
