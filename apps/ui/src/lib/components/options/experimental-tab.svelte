<script lang="ts">
  import { preferences } from "$lib/preferences.svelte";
  import { rpc } from "$lib/rpc";
  import { Folder01Icon, LinkSquare02Icon } from "@hugeicons/core-free-icons";
  import { HugeiconsIcon } from "@hugeicons/svelte";
  import { toast } from "svelte-sonner";

  import { Button } from "../ui/button";
  import { Card, CardContent } from "../ui/card";

  const { base } = $derived(preferences.data);

  const chooseCookiesFilePath = async () => {
    try {
      const selectedFilePath = await rpc.request.selectFile({
        name: "Text File",
        extensions: ["txt"],
      });
      if (selectedFilePath) {
        preferences.update("base.filesystem.cookies", selectedFilePath);
        toast.warning("Cookies File Selected", { richColors: true });
      }
    } catch {
      toast.error("Failed to select cookies directory");
    }
  };

  const removeCookiesFilePath = () => {
    preferences.update("base.filesystem.cookies", "");
  };

  const openLink = (url: string): void => {
    try {
      rpc.request.openExternalUrl({ url });
    } catch {
      toast.error("Failed to open link");
    }
  };
</script>

<Card class="h-full">
  <CardContent class="grid gap-6">
    <div class="space-y-6 text-sm">
      <div class="text-muted-foreground w-lg space-y-3">
        <p class="text-destructive text-base">
          Note: If you&apos;re not an advanced user, please avoid using this feature. It&apos;s just
          a few hours of waiting, your patience won&apos;t kill you but messing with cookies might
          kill your YouTube account.
        </p>
        <p>
          If downloads fail due to rate limits, you can use your own cookies file as an alternative.
          However, please avoid sending excessive requests, as this may result in your account being
          suspended or banned. To use your own cookies, extract them from www.youtube.com using a
          browser extension, then select the folder containing your cookies.txt file.
        </p>
        <p>
          Please note that YouTube rotates cookies periodically, so a single cookie file won&apos;t
          work indefinitely. Do not share your cookies file with anyone, as it contains sensitive
          account information. For your safety and security, the cookies.txt file will be
          automatically deleted after each download.
        </p>
      </div>
      <div class="flex gap-6">
        <Button
          variant="link"
          class="decoration-primary/70 px-0 underline-offset-6 hover:underline"
          onclick={() => {
            openLink(
              "https://chrome.google.com/webstore/detail/get-cookiestxt-locally/cclelndahbckbenkjhflpdbgdldlbecc",
            );
          }}
        >
          <HugeiconsIcon icon={LinkSquare02Icon} size={18} /> Extension for Chrome
        </Button>
        <Button
          variant="link"
          class="decoration-primary/70 px-0 underline-offset-6 hover:underline"
          onclick={() => {
            openLink("https://addons.mozilla.org/en-US/firefox/addon/cookies-txt/");
          }}
        >
          <HugeiconsIcon icon={LinkSquare02Icon} size={18} /> Extension for Firefox
        </Button>
      </div>
    </div>
    <div class="flex items-center gap-3">
      <span class="font-medium">Cookies Directory</span>
      <div class="flex items-center gap-2">
        <Button
          size="sm"
          variant="outline"
          class="w-fit"
          onclick={() => {
            if (!base.filesystem.cookies) {
              chooseCookiesFilePath();
            } else {
              removeCookiesFilePath();
            }
          }}
        >
          <HugeiconsIcon icon={Folder01Icon} class="mr-0.5" />
          {!base.filesystem.cookies ? "Select" : "Remove"}
        </Button>
        <span class="text-xs">{base.filesystem.cookies}</span>
      </div>
    </div>
  </CardContent>
</Card>
