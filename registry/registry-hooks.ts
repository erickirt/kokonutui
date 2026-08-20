import type { Registry } from "./schema";

export const hooks: Registry = [
  {
    name: "use-auto-resize-textarea",
    type: "registry:hook",
    description:
      "React hook that auto-resizes a textarea to fit its content between a min and max height.",
    files: [
      {
        path: "hooks/use-auto-resize-textarea.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-click-outside",
    type: "registry:hook",
    description:
      "React hook that runs a callback when the user clicks outside the referenced element.",
    files: [
      {
        path: "hooks/use-click-outside.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-copy-to-clipboard",
    type: "registry:hook",
    description:
      "React hook that copies text to the clipboard and exposes a copied state with a reset timeout.",
    files: [
      {
        path: "hooks/use-copy-to-clipboard.ts",
        type: "registry:hook",
      },
    ],
  },
  {
    name: "use-mobile",
    type: "registry:hook",
    description:
      "React hook that reports whether the viewport is below the 768px mobile breakpoint.",
    files: [
      {
        path: "hooks/use-mobile.ts",
        type: "registry:hook",
      },
    ],
  },
];
