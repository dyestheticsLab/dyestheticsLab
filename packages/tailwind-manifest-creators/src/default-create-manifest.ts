import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path";
import { generateResponsiveVariants } from "./generate-responsive-variants";


export async function generateCandidates(entry: string): Promise<string[]> {
  const presetContent = await readFile(entry, "utf-8");

  const { preset, options } = JSON.parse(presetContent);

  const candidates = generateResponsiveVariants(preset, options)

  return candidates
}

export interface CreateManifestOptions {
  entry: string;
  targetPath: string;
  flag?: string;
  source?: string;
  forceBreakpoints?: string[]
}

export async function createManifest(
  {
    entry,
    targetPath,
    flag = 'a',
    source,
    forceBreakpoints
  }: CreateManifestOptions): Promise<string> {
  const { preset, options, breakpoints } = JSON.parse(source ?? "{}")
  const candidates = source ? generateResponsiveVariants(preset, options, forceBreakpoints ?? breakpoints)
    : await generateCandidates(entry)

  await mkdir(dirname(targetPath), { recursive: true })

  await writeFile(
    targetPath,
    candidates.join(" "),
    { flag }
  )

  return entry
}
