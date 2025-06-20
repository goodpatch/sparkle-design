import { FC, PropsWithChildren } from "react";
import { DocsContainer, DocsContainerProps } from "@storybook/blocks";

const OpenInV0Container: FC<PropsWithChildren<DocsContainerProps>> = ({ context, children }) => {
  const title = context?.title || "";
  const name = title.split("/").pop()?.toLowerCase();
  const registryUrl = `https://sparkle-design.vercel.app/r/${name}.json`;
  const openUrl = `https://v0.dev/chat/api/open?url=${registryUrl}`;

  return (
    <DocsContainer context={context}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 16 }}>
        <a
          href={openUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            textDecoration: "none",
            background: "#0969DA",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: 4,
          }}
        >
          Open in v0
        </a>
      </div>
      {children}
    </DocsContainer>
  );
};

export default OpenInV0Container;
