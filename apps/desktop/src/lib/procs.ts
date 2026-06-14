import type { ChildProcessWithoutNullStreams } from "child_process";

export const activeDownloadProcesses = new Map<string, ChildProcessWithoutNullStreams>();
export const cancelledDownloads = new Set<string>();
