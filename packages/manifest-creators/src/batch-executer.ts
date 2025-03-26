import { join } from "node:path"

import { defaultCreateManifest } from "./default-create-manifest";
import { BatchOptions } from ".";

export async function batchExecutor(entries: string[], options?: BatchOptions): Promise<void> {
  const {
    batchSize = 20,
    createManifest = defaultCreateManifest,
    onError = console.error,
    onSuccess = console.log,
    targetPath = join(process.cwd(), 'node_modules', '.tailwind-manifests', 'global.manifest')
  } = options ?? {};

  const fnGroups = Array.from({ length: Math.ceil(entries.length / batchSize) })
    .map((_, index) => {
      const subPaths = entries.slice(index * batchSize, (index + 1) * batchSize)
      return () => Promise.allSettled(subPaths.map(async entry => {
        await createManifest(entry, targetPath)!
        return entry
      }))
    })


  for (const fnGroup of fnGroups) {
    const allSettled = await fnGroup()

    allSettled.map((promise) => {
      if (promise.status === 'rejected') {
        onError?.(promise.reason)
      } else {
        onSuccess?.(promise.value)
      }
    })
  }
}