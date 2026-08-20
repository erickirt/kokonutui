import type { Registry } from "@/registry/schema";

export const lib: Registry = [
  {
    name: "utils",
    type: "registry:lib",
    description:
      "The cn utility for merging Tailwind CSS classes, built on clsx and tailwind-merge.",
    dependencies: ["clsx", "tailwind-merge"],
    files: [
      {
        path: "lib/utils.ts",
        type: "registry:lib",
      },
    ],
  },
];
