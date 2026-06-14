<script lang="ts">
  import Footer from "$lib/components/footer.svelte";
  import Header from "$lib/components/header.svelte";

  import "../app.css";

  const { children } = $props();
</script>

<svelte:head>
  <title>Grabbr</title>
</svelte:head>

<div class="from-background fixed inset-0 -z-10 bg-linear-to-b to-amber-700"></div>
<Header />
{@render children()}
<Footer />
