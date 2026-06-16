<script lang="ts">
  import { preferences } from "$lib/preferences.svelte";
  import { Settings01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";

  import { Button } from "../ui/button";
  import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
  import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
  import AudioTab from "./audio-tab/index.svelte";
  import EncodingTab from "./encoding-tab/index.svelte";
  import ExperimentalTab from "./experimental-tab.svelte";
  import GeneralTab from "./general-tab.svelte";
  import SortingTab from "./sorting-tab/index.svelte";
  import UpdatesTab from "./updates-tab.svelte";
  import VideoTab from "./video-tab/index.svelte";
</script>

<Dialog>
  <DialogTrigger>
    {#snippet child({ props })}
      <Button {...props}>
        <HugeiconsIcon icon={Settings01Icon} /> Options
      </Button>
    {/snippet}
  </DialogTrigger>
  <DialogContent class="min-h-142 min-w-2xl">
    <Tabs value={preferences.data.type}>
      <TabsList>
        <TabsTrigger value="audio">Audio</TabsTrigger>
        <TabsTrigger value="video">Video</TabsTrigger>
        <TabsTrigger value="sorting">Sorting</TabsTrigger>
        <TabsTrigger value="encoding">Encoding</TabsTrigger>
        <TabsTrigger value="general">General</TabsTrigger>
        <TabsTrigger value="updates">Updates</TabsTrigger>
        <TabsTrigger
          value="advanced"
          class="text-destructive dark:text-destructive/80 hover:text-destructive! data-active:text-destructive!"
        >
          Experimental
        </TabsTrigger>
      </TabsList>
      <TabsContent value="audio">
        <AudioTab />
      </TabsContent>
      <TabsContent value="video">
        <VideoTab />
      </TabsContent>
      <TabsContent value="sorting">
        <SortingTab />
      </TabsContent>
      <TabsContent value="encoding">
        <EncodingTab />
      </TabsContent>
      <TabsContent value="general">
        <GeneralTab />
      </TabsContent>
      <TabsContent value="updates">
        <UpdatesTab />
      </TabsContent>
      <TabsContent value="advanced">
        <ExperimentalTab />
      </TabsContent>
    </Tabs>
  </DialogContent>
</Dialog>
