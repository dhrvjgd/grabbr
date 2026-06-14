<script lang="ts">
  import { ArrowUpRight01Icon, Download01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image } from "@unpic/svelte";

  import Download from "./download.svelte";
  import { Button } from "./ui/button";
</script>

<footer class="mt-20 flex flex-col gap-28 pb-12 md:items-center md:gap-36 md:pb-24">
  <div class="flex flex-col items-center gap-4">
    <HugeiconsIcon icon={Download01Icon} strokeWidth={2} class="size-12" />
    <span class="heading">Ready to try Grabbr?</span>
    <p class="content max-w-2xl text-center text-balance">
      Grabbr is free, open source, and always will be. Download once, use forever. No subscriptions,
      no accounts, no nonsense.
    </p>
    <div class="flex flex-col items-center -space-y-5">
      <Download />
      <Button
        href="https://github.com/dhrvjgd/grabbr/releases"
        target="_blank"
        rel="noopener noreferrer"
        size="sm"
        variant="link"
        class="text-sm"
      >
        All downloads
        <HugeiconsIcon icon={ArrowUpRight01Icon} />
      </Button>
    </div>
  </div>
  <div class="grid grid-cols-1 gap-8 pl-6 md:grid-cols-3 md:gap-16 md:pl-0">
    <div class="mt-1 flex flex-col gap-1.5 tracking-tight">
      <Image src="dhrvjgd-logo.svg" width={24} height={24} />
      <a href="https://dhrvjgd.tech" target="_blank" rel="noopener noreferrer">
        <Button variant="link" class="px-0 font-medium">dhrvjgd.tech</Button>
      </a>
    </div>
    <div>
      <div class="font-medium">Resources</div>
      <a href="https://github.com/dhrvjgd/grabbr" target="_blank" rel="noopener noreferrer">
        <Button variant="link" class="px-0">
          Github <HugeiconsIcon icon={ArrowUpRight01Icon} />
        </Button>
      </a>
    </div>
    <div>
      <div class="font-medium">Socials</div>
      <a href="https://x.com/dhrvjgd" target="_blank" rel="noopener noreferrer">
        <Button variant="link" class="px-0">X <HugeiconsIcon icon={ArrowUpRight01Icon} /></Button>
      </a>
    </div>
  </div>
</footer>
