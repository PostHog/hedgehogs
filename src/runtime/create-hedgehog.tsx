import { createElement, forwardRef } from "react";
import type { ForwardRefExoticComponent, RefAttributes } from "react";
import type { HedgehogMeta } from "../types.ts";
import type { HedgehogSvgProps } from "./props.ts";

/** A generated SVG hedgehog component, carrying its metadata as a static `.meta`. */
export interface HedgehogComponent extends ForwardRefExoticComponent<
  HedgehogSvgProps & RefAttributes<SVGSVGElement>
> {
  meta: HedgehogMeta;
}

function escapeXml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/**
 * Builds a React component that renders an inline `<svg>`. The optimized markup is
 * injected as a string (cheaper than transpiling thousands of path nodes to JSX, and
 * the exact same payload backs the `/svg` string export).
 */
export function createHedgehog(opts: {
  viewBox: string;
  body: string;
  meta: HedgehogMeta;
}): HedgehogComponent {
  const { viewBox, body, meta } = opts;

  const Component = forwardRef<SVGSVGElement, HedgehogSvgProps>(function Hedgehog(props, ref) {
    const { size, title, width, height, ...rest } = props;
    const sizing =
      size != null
        ? { width: size }
        : width == null && height == null
          ? { width: "100%" }
          : { width, height };
    const inner = title ? `<title>${escapeXml(title)}</title>${body}` : body;

    return createElement("svg", {
      ref,
      xmlns: "http://www.w3.org/2000/svg",
      viewBox,
      role: title ? "img" : undefined,
      "aria-hidden": title ? undefined : true,
      ...sizing,
      ...rest,
      dangerouslySetInnerHTML: { __html: inner },
    });
  }) as HedgehogComponent;

  Component.displayName = `Hedgehog(${meta.slug})`;
  Component.meta = meta;
  return Component;
}
