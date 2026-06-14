<script lang="ts">
  import InputUrl from "$lib/components/input-url.svelte";
  import Options from "$lib/components/options/index.svelte";
  import Type from "$lib/components/type.svelte";
  import { Button } from "$lib/components/ui/button";
  import { Toaster } from "$lib/components/ui/sonner";
  import { Spinner } from "$lib/components/ui/spinner";
  import { TooltipProvider } from "$lib/components/ui/tooltip";
  import { registerListeners } from "$lib/listeners/index";
  import { preferences } from "$lib/preferences.svelte";
  import { rpc } from "$lib/rpc";
  import { isValidUrl } from "@grabbr/contracts/utils";
  import { Download } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { ModeWatcher } from "mode-watcher";
  import { onMount } from "svelte";
  import { toast } from "svelte-sonner";

  onMount(async () => {
    document.addEventListener("contextmenu", (e) => {
      e.preventDefault();
    });
    registerListeners();
    await preferences.load();
  });

  let url = $state("");

  const startDownload = async () => {
    try {
      const normalizedUrl = url.trim();
      if (!isValidUrl(normalizedUrl)) {
        toast.warning("Invalid URL", { richColors: true });
        return;
      }

      const { downloadMode, base } = preferences.data;
      switch (downloadMode) {
        case "ask": {
          const selectedPath = await rpc.request.selectFolder();
          if (!selectedPath) {
            return;
          } else {
            preferences.update("base.filesystem.output", selectedPath);
          }
          break;
        }

        case "select": {
          if (base.filesystem.output.length < 1) {
            toast.error("Download location not set", { richColors: true });
            return;
          }
        }
      }

      rpc.request.startDownload({ url: normalizedUrl });
    } catch {
      toast.error("Something went wrong", { richColors: true });
    } finally {
      url = "";
    }
  };
</script>

<ModeWatcher defaultMode="dark" />
<Toaster />
{#if preferences.loading}
  <div class="flex min-h-dvh flex-col items-center justify-center">
    <Spinner />
  </div>
{:else}
  <TooltipProvider>
    <div class="flex h-dvh flex-col items-center justify-center">
      <div class="w-xs space-y-2 sm:w-xl md:w-2xl">
        <InputUrl bind:url />
        <div class="flex w-full justify-between">
          <div class="flex gap-2">
            <Type />
            <Options />
          </div>
          <Button disabled={!isValidUrl(url.trim())} onclick={startDownload}>
            <HugeiconsIcon icon={Download} /> Download
          </Button>
        </div>
      </div>
    </div>
  </TooltipProvider>
{/if}
