<script lang="ts">
  import { isValidUrl } from "@grabbr/shared/utils";
  import { ClipboardPaste } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { toast } from "svelte-sonner";

  import {
    ContextMenu,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuTrigger,
  } from "./ui/context-menu";
  import { Input } from "./ui/input";

  let { url = $bindable() }: { url: string } = $props();

  const pasteLink = async () => {
    try {
      const pastedUrl = await navigator.clipboard.readText();
      if (!isValidUrl(pastedUrl)) {
        toast.warning("Invalid URL", { id: "invalid-url", richColors: true });
        return;
      }

      url = pastedUrl;
    } catch (error) {
      toast.warning("Something went wrong", { id: "invalid-url", richColors: true });
    }
  };
</script>

<ContextMenu>
  <ContextMenuTrigger>
    <Input
      id="url"
      placeholder="Enter or Paste YouTube/Instagram URL"
      class="font-mono font-medium"
      bind:value={url}
    />
  </ContextMenuTrigger>
  <ContextMenuContent>
    <ContextMenuItem onclick={pasteLink}>
      <HugeiconsIcon icon={ClipboardPaste} /> Paste
    </ContextMenuItem>
  </ContextMenuContent>
</ContextMenu>
