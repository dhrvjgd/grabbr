import { rpc } from "$lib/rpc";
import {
  DefaultPreferences,
  type PreferenceMap,
  type Preferences,
} from "@grabbr/shared/preferences";
import { toast } from "svelte-sonner";

class PreferencesState {
  data = $state<Preferences>(DefaultPreferences);
  loading = $state(true);

  async load() {
    try {
      const savedPreferences = await rpc.request.getPreferences();
      this.data = savedPreferences;
    } catch {
      toast.error("Failed to load preferences");
    } finally {
      this.loading = false;
    }
  }

  async reload() {
    await this.load();
  }

  update<K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) {
    rpc.request.setPreference({ key, value });

    const parts = key.split(".");
    const last = parts.pop()!;

    let current: any = this.data;

    for (const part of parts) {
      current = current[part];
    }

    current[last] = value;
  }
}

export const preferences = new PreferencesState();
