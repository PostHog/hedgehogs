import { createElement, forwardRef } from "react";
import type { CSSProperties, ForwardRefExoticComponent, RefAttributes } from "react";
import type { HedgehogMeta } from "../types.ts";
import type { HedgehogImgProps } from "./props.ts";

/** A generated PNG hedgehog component, carrying its metadata as a static `.meta`. */
export interface PngHedgehogComponent extends ForwardRefExoticComponent<
  HedgehogImgProps & RefAttributes<HTMLImageElement>
> {
  meta: HedgehogMeta;
}

/**
 * Builds a React component that renders a bundled `<img>`. `src` is a package-relative
 * asset URL (resolved via `import.meta.url`), so the consumer's bundler emits and serves
 * the PNG from their own origin — never the CDN at runtime.
 */
export function createPngHedgehog(opts: { src: string; meta: HedgehogMeta }): PngHedgehogComponent {
  const { src, meta } = opts;

  const Component = forwardRef<HTMLImageElement, HedgehogImgProps>(function Hedgehog(props, ref) {
    const { size, title, width, height, style, alt, loading, ...rest } = props;
    const sizing =
      size != null
        ? { width: size }
        : width == null && height == null
          ? { width: "100%" }
          : { width, height };
    // Preserve aspect ratio unless the caller fixes the height explicitly.
    const aspectStyle: CSSProperties =
      height == null && style?.height == null
        ? { aspectRatio: String(meta.aspectRatio), height: "auto" }
        : {};

    return createElement("img", {
      ref,
      src,
      alt: alt ?? title ?? "",
      "aria-hidden": alt == null && title == null ? true : undefined,
      loading: loading ?? "lazy",
      ...sizing,
      style: { ...aspectStyle, ...style },
      ...rest,
    });
  }) as PngHedgehogComponent;

  Component.displayName = `Hedgehog(${meta.slug})`;
  Component.meta = meta;
  return Component;
}
