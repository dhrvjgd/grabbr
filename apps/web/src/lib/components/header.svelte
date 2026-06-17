<script lang="ts">
  import { ArrowDown01Icon, ArrowUpRight01Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { Image } from "@unpic/svelte";

  import Download from "./download.svelte";
  import { Button } from "./ui/button";
  import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
</script>

<header
  class="fixed top-0 container mx-auto flex items-center justify-between px-6 py-4 md:py-8 lg:px-4"
>
  <div
    class="from-background/60 via-background/30 absolute inset-x-0 top-0 -z-10 h-16 bg-linear-to-b to-transparent"
  ></div>

  <a href="/" class="inline-flex items-center gap-2.5">
    <Image src="/favicon.png" width={32} height={32} />
    <h1 class="text-2xl font-medium tracking-tight">Grabbr</h1>
  </a>
  <div class="md:hidden">
    <DropdownMenu>
      <DropdownMenuTrigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" size="lg">
            Links <HugeiconsIcon icon={ArrowDown01Icon} />
          </Button>
        {/snippet}
      </DropdownMenuTrigger>
      <DropdownMenuContent class="mt-2.5 w-max">
        <div class="flex flex-col items-end gap-1 pr-4">
          <Button
            href="https://github.com/dhrvjgd/grabbr"
            target="_blank"
            rel="noopener noreferrer"
            variant="link"
            size="lg"
            class="mix-blend-difference"
          >
            Github
            <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
          </Button>
          <Download showInfo={false} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  </div>
  <div class="hidden items-center gap-2 md:inline-flex">
    <Button
      href="https://github.com/dhrvjgd/grabbr"
      target="_blank"
      rel="noopener noreferrer"
      variant="link"
      size="lg"
      class="mix-blend-difference"
    >
      Github
      <HugeiconsIcon icon={ArrowUpRight01Icon} strokeWidth={2} />
    </Button>
    <Download showInfo={false} />
  </div>
</header>
