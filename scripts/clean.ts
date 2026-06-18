import { $ } from "bun";

try {
  // remove all node_modules directories
  await $`find . -type d -name node_modules -prune -print -exec rm -rf '{}' +`;

  // remove all .turbo cache
  await $`find . -type d -name .turbo -prune -print -exec rm -rf '{}' +`;

  // remove the lock file & cache remains
  await $`rm -rvf bun.lock apps/ui/.svelte-kit apps/web/.svelte-kit`;

  // remove the build dirs
  await $`rm -rvf apps/desktop/build apps/desktop/artifacts apps/ui/dist apps/web/.vercel`;
} catch (error) {
  console.error(error);
}
