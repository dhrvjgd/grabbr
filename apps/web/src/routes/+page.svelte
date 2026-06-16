<script lang="ts">
  import Features1 from "$lib/components/features-1.svelte";
  import Features2 from "$lib/components/features-2.svelte";
  import Features3 from "$lib/components/features-3.svelte";
  import Main from "$lib/components/main.svelte";
</script>

<main
  class="mt-42 flex flex-col items-center gap-14 overflow-hidden px-6 md:mt-50 md:gap-20 md:px-12"
>
  <Main />
  <Features1 />
  <Features2 />
  <Features3 />
</main>
