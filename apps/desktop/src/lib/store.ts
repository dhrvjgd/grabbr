import { Database } from "bun:sqlite";
import { mkdirSync } from "fs";
import { join } from "path";

import {
  DefaultPreferences,
  type PreferenceMap,
  type Preferences,
} from "@grabbr/shared/preferences";
import { Utils } from "electrobun/bun";

const userData = Utils.paths.userData;
mkdirSync(userData, { recursive: true });

const db = new Database(join(userData, "grabbr.db"));
db.run("PRAGMA journal_mode=WAL");
db.run("PRAGMA wal_autocheckpoint=100"); // checkpoint frequently — keeps WAL small even without clean exit
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
const stmtDelete = db.query<void, [string]>(`DELETE FROM preferences WHERE key = ?`);

// safe dot-path setter — coerces non-object intermediates rather than throwing
function setByPath(obj: any, path: string, value: unknown): void {
  const segments = path.split(".");
  segments.reduce((o: any, k, i) => {
    if (i === segments.length - 1) {
      o[k] = value;
    } else {
      if (typeof o[k] !== "object" || o[k] === null) o[k] = {};
    }
    return o[k];
  }, obj);
}

// in-memory cache — reads never hit disk
let cache: Preferences = (() => {
  const rows = db
    .query<{ key: string; value: string }, []>(`SELECT key, value FROM preferences`)
    .all();

  const result = structuredClone(DefaultPreferences) as Preferences;

  for (const { key, value } of rows) {
    // purge stale keys no longer present in DefaultPreferences
    const stillExists =
      key.split(".").reduce<any>((obj, k) => obj?.[k], DefaultPreferences) !== undefined;
    if (!stillExists) {
      stmtDelete.run(key);
      continue;
    }
    // corrupted rows are deleted and fall back to the default value
    try {
      setByPath(result, key, JSON.parse(value));
    } catch {
      stmtDelete.run(key);
    }
  }

  return result;
})();

function getPrefs<K extends keyof PreferenceMap>(key: K): PreferenceMap[K] {
  const val = (key as string).split(".").reduce<any>((obj, k) => obj?.[k], cache);
  if (val !== undefined) return val;
  // fallback to default if cache is somehow missing the key
  return (key as string).split(".").reduce<any>((obj, k) => obj?.[k], DefaultPreferences);
}

function savePrefs<K extends keyof PreferenceMap>(key: K, value: PreferenceMap[K]) {
  const prev = getPrefs(key);
  setByPath(cache, key as string, value);
  try {
    stmtSet.run(key as string, JSON.stringify(value));
  } catch (e) {
    setByPath(cache, key as string, prev); // revert cache on DB failure
    throw e;
  }
}

function resetPrefs<K extends keyof PreferenceMap>(...keys: K[]) {
  for (const key of keys) {
    const defaultVal = (key as string)
      .split(".")
      .reduce<any>((obj, k) => obj?.[k], DefaultPreferences);
    const prev = getPrefs(key);
    setByPath(cache, key as string, defaultVal);
    try {
      stmtSet.run(key as string, JSON.stringify(defaultVal));
    } catch (e) {
      setByPath(cache, key as string, prev); // revert cache on DB failure
      throw e;
    }
  }
}

// guard against double-close if multiple signals fire
let dbClosed = false;
export function closeDb(): void {
  if (dbClosed) return;
  dbClosed = true;
  try {
    db.close();
  } catch {}
}

export const store = {
  get all(): Readonly<Preferences> {
    return cache; // live ref — treat as read-only
  },
  get: getPrefs,
  set: savePrefs,
  reset: resetPrefs,
};
