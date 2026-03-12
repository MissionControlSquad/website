import { Mermaid } from "./Mermaid";
import { JsonLd } from "./JsonLd";
import type { ComponentPropsWithoutRef } from "react";

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
