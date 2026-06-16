<script lang="ts" module>
  import { toggleVariants } from "$lib/components/ui/toggle/index.js";
  import { getContext, setContext } from "svelte";
  import type { VariantProps } from "tailwind-variants";

  type ToggleVariants = VariantProps<typeof toggleVariants>;

  interface ToggleGroupContext extends ToggleVariants {
    spacing?: number;
    orientation?: "horizontal" | "vertical";
  }

  export function setToggleGroupCtx(props: ToggleGroupContext) {
    setContext("toggleGroup", props);
  }

  export function getToggleGroupCtx() {
    return getContext<Required<ToggleGroupContext>>("toggleGroup");
  }
</script>

<script lang="ts">
  import { cn } from "$lib/utils.js";
  import { ToggleGroup as ToggleGroupPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    value = $bindable(),
    class: className,
    size = "default",
    spacing = 0,
    orientation = "horizontal",
    variant = "default",
    ...restProps
  }: ToggleGroupPrimitive.RootProps &
    ToggleVariants & {
      spacing?: number;
      orientation?: "horizontal" | "vertical";
    } = $props();

  setToggleGroupCtx({
    get variant() {
      return variant;
    },
    get size() {
      return size;
    },
    get spacing() {
      return spacing;
    },
    get orientation() {
      return orientation;
    },
  });

  $effect(() => {
    if (!ref) return;

    const preventDeselect = (e: Event) => {
      const item = (e.target as HTMLElement).closest(
        "[data-toggle-group-item]",
      ) as HTMLElement | null;
      if (!item || item.dataset.state !== "on") return;

      // block the click only when this would empty the selection.
      // For type="single": value is a string — any click on the selected item empties it.
      // For type="multiple": only block when this is the last selected item.
      const wouldEmpty = Array.isArray(value) ? value.length <= 1 : Boolean(value);
      if (wouldEmpty) e.stopPropagation();
    };

    ref.addEventListener("click", preventDeselect, { capture: true });
    return () => ref?.removeEventListener("click", preventDeselect, { capture: true });
  });
</script>

<!--
Discriminated Unions + Destructing (required for bindable) do not
get along, so we shut typescript up by casting `value` to `never`.
-->
<ToggleGroupPrimitive.Root
  bind:value={value as never}
  bind:ref
  {orientation}
  data-slot="toggle-group"
  data-variant={variant}
  data-size={size}
  data-spacing={spacing}
  style={`--gap: ${spacing}`}
  class={cn(
    "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-vertical:flex-col data-vertical:items-stretch data-[spacing=0]:data-[variant=outline]:rounded-2xl",
    className,
  )}
  {...restProps}
/>
