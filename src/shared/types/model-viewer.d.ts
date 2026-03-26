import type * as React from "react";

type ModelViewerProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLElement>,
  HTMLElement
> & {
  alt?: string;
  ar?: boolean | "true" | "false";
  autoplay?: boolean | "true" | "false";
  class?: string;
  "camera-controls"?: boolean | "true" | "false";
  "camera-orbit"?: string;
  "disable-pan"?: boolean | "true" | "false";
  exposure?: number | string;
  "interaction-prompt"?: string;
  loading?: "auto" | "eager" | "lazy";
  src?: string;
  "shadow-intensity"?: number | string;
  style?: React.CSSProperties;
  "touch-action"?: string;
};

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}

declare module "react/jsx-runtime" {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": ModelViewerProps;
    }
  }
}
