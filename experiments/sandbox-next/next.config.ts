import type { NextConfig } from "next";

const createNextConfig = async (): Promise<NextConfig> => {
  return {
    output: "export",
  };
};

export default createNextConfig

