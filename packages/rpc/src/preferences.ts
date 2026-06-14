import type { PreferenceMap, Preferences } from "@grabbr/contracts/types";

export type PreferencesRequests = {
  getPreferences: {
    params: void;
    response: Preferences;
  };

  setPreference: {
    params: {
      key: keyof PreferenceMap;
      value: PreferenceMap[keyof PreferenceMap];
    };
    response: void;
  };

  clearPreferences: {
    params: void;
    response: void;
  };
};
