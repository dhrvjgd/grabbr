<script lang="ts">
  import { getDownloadInfo, type DownloadInfo } from "$lib";
  import {
    Desktop,
    Download01Icon,
    Link02Icon,
    Share03Icon,
    Tick02Icon,
  } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { onMount } from "svelte";

  import { Button } from "./ui/button";
  import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
  import { Spinner } from "./ui/spinner";

  let { showInfo = true }: { showInfo?: boolean } = $props();
  let info = $state<DownloadInfo>();
  let open = $state(false);
  let isCopied = $state(false);
  let copyTimeout: ReturnType<typeof setTimeout>;

  onMount(async () => {
    info = await getDownloadInfo();
  });
</script>

<section class="inline-flex {showInfo ? 'mt-2 min-h-24' : ''} flex-col items-center gap-2">
  {#if !info}
    <Spinner />
  {:else}
    {#if info.isMobile}
      <Sheet bind:open>
        <SheetTrigger>
          <Button size="lg" class={showInfo ? "h-12" : ""}>
            <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
            Download
            {#if showInfo}
              Grabbr
            {/if}
          </Button>
        </SheetTrigger>
        <SheetContent
          side="bottom"
          showCloseButton={false}
          class="border-t-0! bg-linear-to-t from-amber-800 from-30% to-transparent"
        >
          <div class="flex flex-col items-center gap-2 p-4 font-medium">
            <HugeiconsIcon icon={Desktop} class="size-8" strokeWidth={2} />
            <div class="text-2xl tracking-tight">Get Grabbr for Desktop</div>
            <p class="content text-center text-lg">
              Grabbr is available only on desktop at this time. Wanna share the link to your
              computer or save it for later?
            </p>
            <div class="grid w-full grid-cols-2 gap-2">
              <Button
                variant="outline"
                size="lg"
                class="h-full flex-col gap-0 border-0 py-4 text-lg"
                onclick={() => navigator.share({ url: window.location.origin })}
              >
                <HugeiconsIcon icon={Share03Icon} class="size-6" />
                Share
              </Button>
              <Button
                variant="outline"
                size="lg"
                class="h-full flex-col gap-0 border-0 py-4 text-lg"
                onclick={() => {
                  navigator.clipboard.writeText(window.location.origin);
                  isCopied = true;
                  clearTimeout(copyTimeout);
                  copyTimeout = setTimeout(() => {
                    isCopied = false;
                  }, 3000);
                }}
              >
                {#key isCopied}
                  <span class="animate-in zoom-in-75 fade-in duration-200">
                    <HugeiconsIcon icon={isCopied ? Tick02Icon : Link02Icon} class="size-6" />
                  </span>
                {/key}
                Copy link
              </Button>
            </div>
            <Button size="lg" class="w-full" onclick={() => (open = false)}>Close</Button>
          </div>
        </SheetContent>
      </Sheet>
    {:else}
      <Button href={info.link} size="lg" class={showInfo ? "h-12" : ""}>
        <HugeiconsIcon icon={Download01Icon} strokeWidth={2} />
        Download
        {#if showInfo}
          Grabbr
        {/if}
      </Button>
    {/if}

    {#if showInfo}
      <div class="space-x-0.5 text-xs font-medium">
        {#if info.os === "unknown"}
          <span>Currently available in </span>
        {/if}
        <span class="border-foreground rounded-md border px-1.5 py-0.5 tracking-wide">BETA</span>
        <span>
          {#if info.os === "linux"}
            Linux AppImage (64-bit)
          {:else if info.os === "macos"}
            macOS App (64-bit)
          {:else if info.os === "windows"}
            Windows Installer (64-bit)
          {/if}
        </span>
      </div>
    {/if}
  {/if}
</section>
