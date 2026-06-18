import type { ChildProcessWithoutNullStreams } from "child_process";

export const activeDownloadProcesses = new Map<string, ChildProcessWithoutNullStreams>();
export const cancelledDownloads = new Set<string>();

export const cleanupDownloadProcesses = () => {
  for (const [, proc] of activeDownloadProcesses) {
    try {
      proc.kill("SIGKILL");
    } catch (error) {
      console.error(error);
    }
  }
};
