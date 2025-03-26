import type { NextConfig } from "next";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import { createManifestFile } from "./scripts/create-manifest-file";

// IDK YET HOW TO RESOLVE THIS
const presetsInUsage = ['button']

// Create a function that sets up the config
const setupConfig = async () => {
  const manifestFilesCreationPromises = presetsInUsage.map(async (presetName: string) => {
    const presetPath = resolve(process.cwd(), `src/presets/${presetName}.tailwindConfig.json`);
    const presetContent = await readFile(presetPath, "utf-8");
    const preset = JSON.parse(presetContent);


    return createManifestFile({
      preset,
      name: presetName,
    })
  })

  await Promise.all(manifestFilesCreationPromises)
}


// Bloquear el proceso hasta que `setupConfig` termine
const createNextConfig = async (): Promise<NextConfig> => {
  await setupConfig();

  return {
    output: "export",
  };
};

export default createNextConfig

