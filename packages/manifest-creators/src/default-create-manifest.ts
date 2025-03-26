import { mkdir, readFile, writeFile } from "node:fs/promises"
import { dirname } from "node:path";

export interface Preset {
  extends?: Preset[];
  base?: string | string[];
  variants?: Record<string, Record<string, string | string[]>>;
  responsiveVariants?: boolean | Record<string, boolean>;
}

export const generateResponsiveVariants = (
  preset: Preset,
  breakpoints: string[] = ["sm", "md", "lg"]
) => {
  const { variants } = preset

  return Object.keys(variants!)
    .flatMap(variantKey => Object.values(variants![variantKey]))
    .flatMap(
      classNames => Array
        .isArray(classNames) ? classNames : classNames.split(" ")
    )
    .flatMap((className) => breakpoints
      .map(breakpoint => `${breakpoint}:${className}`)
    )
}

export async function generateCandidates(entry: string): Promise<string[]> {
  const presetContent = await readFile(entry, "utf-8");

  const preset = JSON.parse(presetContent);

  const candidates = generateResponsiveVariants(preset)

  return candidates
}

export async function defaultCreateManifest(entry: string, targetPath: string): Promise<string> {

  const candidates = await generateCandidates(entry)

  await mkdir(dirname(targetPath), { recursive: true })

  await writeFile(
    targetPath,
    candidates.join(" "),
    { flag: 'a' }
  )

  return entry
}