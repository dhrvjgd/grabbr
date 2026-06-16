export const isValidUrl = (url: string) => {
  try {
    const { hostname, pathname, searchParams } = new URL(url);

    const validYouTubeHosts = new Set([
      "youtu.be",
      "youtube.com",
      "www.youtube.com",
      "m.youtube.com",
      "music.youtube.com",
    ]);

    if (validYouTubeHosts.has(hostname)) {
      if (hostname === "youtu.be") {
        return pathname.length > 1;
      }
      if (pathname === "/watch") {
        return searchParams.has("v");
      }
      if (pathname.startsWith("/embed/")) {
        return (pathname.split("/")[2]?.length ?? 0) > 0;
      }
      if (pathname.startsWith("/shorts/")) {
        return (pathname.split("/")[2]?.length ?? 0) > 0;
      }
      if (pathname.startsWith("/live/")) {
        return (pathname.split("/")[2]?.length ?? 0) > 0;
      }
      return false;
    }

    const validInstagramHosts = new Set(["instagram.com", "www.instagram.com", "m.instagram.com"]);

    if (validInstagramHosts.has(hostname)) {
      if (pathname.startsWith("/p/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && (segments[2]?.length ?? 0) > 0;
      }
      if (pathname.startsWith("/reel/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && (segments[2]?.length ?? 0) > 0;
      }
      if (pathname.startsWith("/tv/")) {
        const segments = pathname.split("/");
        return segments.length >= 3 && (segments[2]?.length ?? 0) > 0;
      }
      return false;
    }

    return false;
  } catch {
    return false;
  }
};

export type DeepKeyOf<T> = {
  [K in keyof T & string]: T[K] extends object ? K | `${K}.${DeepKeyOf<T[K]>}` : K;
}[keyof T & string];

export type DeepValue<T, K extends string> = K extends `${infer A}.${infer B}`
  ? A extends keyof T
    ? DeepValue<T[A], B>
    : never
  : K extends keyof T
    ? T[K]
    : never;
