<script lang="ts">
  import { rpc } from "$lib/rpc";
  import { ReloadIcon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  import { Button } from "../ui/button";
  import { Card, CardContent } from "../ui/card";
  import { Spinner } from "../ui/spinner";

  const YTDLP_VERSION_KEY = "ytdlp-version";

  let isLoading = $state(false);
  let ytdlpVersion = $state(localStorage.getItem(YTDLP_VERSION_KEY) ?? "...");

  onMount(async () => {
    if (!localStorage.getItem(YTDLP_VERSION_KEY)) {
      try {
        const version = await rpc.request.ytdlpVersion();
        ytdlpVersion = version;
        localStorage.setItem(YTDLP_VERSION_KEY, version);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const updateYtdlp = async () => {
    isLoading = true;
    try {
      const { version, alreadyLatest } = await rpc.request.ytdlpUpdate();
      ytdlpVersion = version;
      localStorage.setItem(YTDLP_VERSION_KEY, version);

      if (alreadyLatest) {
        toast.info("yt-dlp is already up to date", { id: "ytdlp-update" });
      } else {
        toast.success(`yt-dlp updated to ${version}`, { id: "ytdlp-update" });
      }
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : "Something went wrong", {
        id: "ytdlp-update",
        richColors: true,
      });
    } finally {
      isLoading = false;
    }
  };
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <div class="space-y-1">
      <div class="text-base font-medium">yt-dlp</div>
      <ul class="ml-6 list-disc">
        <li>Sources: YouTube, Instagram</li>
        <li>Version: {ytdlpVersion}</li>
      </ul>
      <Button class="mt-2" size="sm" onclick={updateYtdlp} disabled={isLoading}>
        {#if isLoading}
          <Spinner data-icon="inline-start" />
          Updating...
        {:else}
          <HugeiconsIcon icon={ReloadIcon} />
          Update
        {/if}
      </Button>
    </div>
  </CardContent>
</Card>
