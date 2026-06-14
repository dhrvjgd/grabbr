import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
import { join } from "path";

import { DefaultPreferences } from "@grabbr/contracts/enums";
import type { PreferenceMap, Preferences } from "@grabbr/contracts/types";
import { Utils } from "electrobun/bun";

const userData = Utils.paths.userData;
mkdirSync(userData, { recursive: true });
const db = new Database(join(userData, "grabbr.db"));

// WAL mode for better write performance
db.run("PRAGMA journal_mode=WAL");

db.run(`
  CREATE TABLE IF NOT EXISTS preferences (
    key   TEXT PRIMARY KEY,
    value TEXT NOT NULL
  )
`);

// prepared statements — defined once, reused every call
const stmtSet = db.query<void, [string, string]>(
  `INSERT OR REPLACE INTO preferences (key, value) VALUES (?, ?)`,
);

// in-memory cache — reads never hit disk
let cache: Preferences = (() => {
  const rows = db
    .query<{ key: string; value: string }, []>(`SELECT key, value FROM preferences`)
    .all();
  const flat: Record<string, unknown> = {};
  for (const row of rows) flat[row.key] = JSON.parse(row.value);

  // hydrate cache from flat keys into nested object
  const result = structuredClone(DefaultPreferences) as Preferences;
  for (const [key, value] of Object.entries(flat)) {
    key.split(".").reduce((obj: any, k, i, arr) => {
      if (i === arr.length - 1) obj[k] = value;
      else obj[k] ??= {};
      return obj[k];
    }, result);
  }
  return result;
})();

function getPrefs<K extends keyof PreferenceMap>(key: K): PreferenceMap[K] {
  return (key as string).split(".").reduce((obj: any, k) => obj?.[k], cache);
}

function savePrefs<K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) {
  // update cache
  const segments = (key as string).split(".");
  segments.reduce((obj: any, k, i) => {
    if (i === segments.length - 1) obj[k] = value;
    else obj[k] ??= {};
    return obj[k];
  }, cache);

  // partial write — only this key changes on disk
  stmtSet.run(key as string, JSON.stringify(value));
}

function resetPrefs<K extends keyof PreferenceMap>(...keys: K[]) {
  for (const key of keys) {
    const segments = (key as string).split(".");
    const defaultVal = segments.reduce((obj: any, k) => obj?.[k], DefaultPreferences);

    // update cache
    segments.reduce((obj: any, k, i) => {
      if (i === segments.length - 1) obj[k] = defaultVal;
      else obj[k] ??= {};
      return obj[k];
    }, cache);

    stmtSet.run(key as string, JSON.stringify(defaultVal));
  }
}

export const store = {
  get store(): Preferences {
    return cache;
  },
  get: getPrefs,
  set: savePrefs,
  reset: resetPrefs,
};
