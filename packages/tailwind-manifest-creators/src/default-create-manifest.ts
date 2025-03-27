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
}

export async function createManifest(
  {
    entry,
    targetPath,
    flag = 'a',
    source
  }: CreateManifestOptions): Promise<string> {

  const candidates = source ? generateResponsiveVariants(JSON.parse(source).preset)
    : await generateCandidates(entry)

  await mkdir(dirname(targetPath), { recursive: true })

  await writeFile(
    targetPath,
    candidates.join(" "),
    { flag }
  )

  return entry
}
