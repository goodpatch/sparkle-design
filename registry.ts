import { RegistryEntry } from "./scripts/schema";

const registry: RegistryEntry[] = [
  {
    name: "sparkle_button",
    type: "registry:component",
    registryDependencies: [],
    dependencies: [],
    devDependencies: [],
    tailwind: {
      config: {},
    },
    cssVars: {},
    files: ["button"],
  },
];
export default registry;
