import { createManifest } from "@dyesthetics-lab/tailwind-manifest-creators";

createManifest({
  globPath: './**/*.tailwindConfig.json',
} as any);