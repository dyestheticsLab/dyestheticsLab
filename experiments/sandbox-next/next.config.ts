import type { NextConfig } from "next";

const createNextConfig = async (): Promise<NextConfig> => {
  return {
    output: "export",
    webpack(config, {dev}){
      if(!dev)
          return config;

      config.module.rules.push({
        test: /\.tailwindConfig.json$/,
        use: [
          {
            loader: require.resolve("@dyesthetics-lab/tailwind-manifest-creators/manifest-loader"),
          }
        ]
      });

      return config;
    }
  };
};

export default createNextConfig

