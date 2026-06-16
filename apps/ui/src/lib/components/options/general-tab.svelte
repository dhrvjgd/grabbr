<script lang="ts">
  import { preferences } from "$lib/preferences.svelte";
  import { rpc } from "$lib/rpc";
  import { DownloadModeEnum } from "@grabbr/shared/preferences";
  import {
    Folder01Icon,
    HelpCircleIcon,
    Moon02Icon,
    Sun03Icon,
    Tick02Icon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { mode, setMode } from "mode-watcher";
  import { toast } from "svelte-sonner";

  import { Button } from "../ui/button";
  import { Card, CardContent } from "../ui/card";
  import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
  import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

  let prefReset = $state(false);

  const { downloadMode, base } = $derived(preferences.data);

  const selectDownloadDirectory = async () => {
    const selectedPath = await rpc.request.selectFolder();
    if (selectedPath) {
      preferences.update("base.filesystem.output", selectedPath);
      if (downloadMode !== DownloadModeEnum.SELECT) {
        preferences.update("downloadMode", DownloadModeEnum.SELECT);
      }
      toast.success("Download Location Selected");
    }
  };

  const resetPreferences = async () => {
    prefReset = true;
    await rpc.request.clearPreferences();
    await preferences.reload();
    setTimeout(() => {
      prefReset = false;
    }, 6000);
  };
</script>

<Card class="h-full">
  <CardContent class="space-y-6">
    <div class="space-y-1">
      <div class="font-medium">Theme</div>
      <ToggleGroup
        type="single"
        value={mode.current}
        onValueChange={(value) => {
          setMode(value as "light" | "dark");
        }}
      >
        <ToggleGroupItem value="light">
          <HugeiconsIcon icon={Sun03Icon} /> Light
        </ToggleGroupItem>
        <ToggleGroupItem value="dark">
          <HugeiconsIcon icon={Moon02Icon} class="size-3.5" /> Dark
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
    <div class="space-y-1">
      <div class="font-medium">Download Directory</div>
      <div class="flex items-center gap-2">
        <ToggleGroup
          type="single"
          value={downloadMode}
          onValueChange={(value) => {
            if (value === DownloadModeEnum.SELECT) {
              selectDownloadDirectory();
            } else {
              preferences.update("downloadMode", value as DownloadModeEnum);
            }
          }}
        >
          <ToggleGroupItem value={DownloadModeEnum.ASK}>
            <HugeiconsIcon icon={HelpCircleIcon} /> Ask Each Time
          </ToggleGroupItem>
          {#if downloadMode === DownloadModeEnum.SELECT}
            <Tooltip>
              <TooltipTrigger>
                {#snippet child({ props })}
                  <ToggleGroupItem value={DownloadModeEnum.SELECT}>
                    <HugeiconsIcon icon={Folder01Icon} class="mr-0.5" />
                    {base.filesystem.output.length > 15
                      ? `${base.filesystem.output.slice(0, 15)}...`
                      : base.filesystem.output}
                  </ToggleGroupItem>
                {/snippet}
              </TooltipTrigger>
              <TooltipContent>
                <p>{base.filesystem.output}</p>
              </TooltipContent>
            </Tooltip>
          {:else}
            <ToggleGroupItem value={DownloadModeEnum.SELECT}>
              <HugeiconsIcon icon={Folder01Icon} />
              Select
            </ToggleGroupItem>
          {/if}
        </ToggleGroup>
        {#if downloadMode === DownloadModeEnum.SELECT}
          <Button onclick={selectDownloadDirectory}>Change</Button>
        {/if}
      </div>
    </div>
    <div class="space-y-1">
      <div class="font-medium">Reset Options</div>
      <Button onclick={resetPreferences} disabled={prefReset}>
        {#if !prefReset}
          Reset
        {:else}
          <HugeiconsIcon icon={Tick02Icon} strokeWidth={2} />
        {/if}
      </Button>
    </div>
    <div class="text-muted-foreground absolute right-12 bottom-10 text-xs font-medium">
      v{preferences.data.appVersion}
    </div>
  </CardContent>
</Card>
