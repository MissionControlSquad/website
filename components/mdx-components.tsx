import { Mermaid } from "./Mermaid";
import type { ComponentPropsWithoutRef } from "react";

// JsonLd schemas are extracted from MDX at build time (lib/blog.ts) and rendered
// by the page server component. This no-op prevents MDX from treating <JsonLd>
// as an unknown element while avoiding the RSC dangerouslySetInnerHTML issue.
function JsonLd() {
  return null;
}

function Pre(props: ComponentPropsWithoutRef<"pre">) {
  const child = props.children as
    | React.ReactElement<{
        className?: string;
        children?: string;
      }>
    | undefined;

  // Detect ```mermaid code blocks
  if (
    child &&
    typeof child === "object" &&
    "props" in child &&
    child.props?.className?.includes("language-mermaid")
  ) {
    const chart = typeof child.props.children === "string" ? child.props.children : "";
    return <Mermaid chart={chart} />;
  }

  return <pre {...props} />;
}

export const mdxComponents = {
  pre: Pre,
  Mermaid,
  JsonLd,
};
