import { dirname, join } from "node:path"
import { mkdir, writeFile } from "node:fs/promises"
import { generateResponsiveVariants, Preset } from "./generate-responsive-variants"

export interface CreateManifestFileOptions {
  preset: Preset
  breakpoints?: string[]
  name: string
}

export const createManifestFile = async (
  { preset, breakpoints, name }: CreateManifestFileOptions,
  cwd = process.cwd()
) => {
  const manifestDir = join(
    cwd,
    'node_modules',
    '.tailwind-manifests',
    `${name}.tailwind.manifest`
  )

  await mkdir(dirname(manifestDir), { recursive: true })

  // TODO: generate normal variatns 
  const data = generateResponsiveVariants(preset, breakpoints)

  return writeFile(
    manifestDir,
    data
  )
}