import type { PreferenceMap } from "@grabbr/shared/preferences";

import { store } from "../lib/store";

export const getPreferences = () => {
  return store.all;
};

export const setPreference = <K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) => {
  console.info("store:", key, "-", value);

  store.set(key, value);
};

export const clearPreferences = () => {
  console.info("Preferences cleared");
  store.reset("type", "base", "audio", "video", "downloadMode");
};
