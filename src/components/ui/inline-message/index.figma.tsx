import React from "react";
import figma from "@figma/code-connect";
import {
  InlineMessage,
  InlineMessageTitle,
  InlineMessageDescription,
} from "./index";

/**
 * -- This file was added for Code Connect integration --
 * Adjust the Figma node URL (second argument of figma.connect) to point to the
 * Inline Message component main node in your design file.
 */

figma.connect(
  InlineMessage,
  "https://www.figma.com/design/7alBZXZf65YgcII41TWT0r/Sparkle-Design?node-id=1266-14202&t=CwUJ2Ai1sr1vc7fe-4",
  {
    props: {
      status: figma.enum("status", {
        info: "info",
        warning: "warning",
        negative: "negative",
        success: "success",
      }),
      isTitle: figma.boolean("isTitle"),
      isCloseTrigger: figma.boolean("isCloseTrigger"),
      title: figma.string("title"),
      description: figma.string("description"),
    },
    example: props => (
      <InlineMessage
        status={props.status}
        isTitle={props.isTitle}
        isCloseTrigger={props.isCloseTrigger}
        title={props.title}
        description={props.description}
        onClose={props.isCloseTrigger ? () => console.log("closed") : undefined}
      >
        {props.isTitle && props.title ? (
          <InlineMessageTitle>{props.title}</InlineMessageTitle>
        ) : null}
        {props.description ? (
          <InlineMessageDescription>
            {props.description}
          </InlineMessageDescription>
        ) : null}
      </InlineMessage>
    ),
  }
);
