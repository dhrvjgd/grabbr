<script lang="ts">
  import { Image } from "@unpic/svelte";

  import Download from "./download.svelte";
</script>

<section class="flex flex-col items-center gap-4">
  <Image src="/favicon.png" class="size-12" />
  <h2 class="heading mb-2 max-w-2xl text-center">
    One downloader. Every format. YouTube, Instagram, and more soon.
  </h2>
  <p class="content max-w-2xl text-center">
    Grabbr is a cross-platform multimedia downloader that lets you save videos, audio, and more from
    anywhere. Batch downloads, format conversion, and quality selection — all in one clean, native
    app. Fully open source.
  </p>
  <Download />
</section>
<div class="mt-12 ml-auto w-[150%] pl-2 md:w-full md:pl-0">
  <Image src="/screenshots/screen.png" class="screenshot" />
</div>
