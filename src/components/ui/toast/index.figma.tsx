import React from "react";
import { Toast, showToast } from "./index";
import { Button } from "../button";
import figma from "@figma/code-connect";

figma.connect(
  Toast,
  "https://www.figma.com/design/7alBZXZf65YgcII41TWT0r/Sparkle-Design?node-id=2784-15500",
  {
    props: {
      status: figma.enum("status", {
        neutral: "neutral",
        success: "success",
        negative: "negative",
      }),
      title: figma.string("title"),
      description: figma.string("description"),
      isCloseButtonVisible: figma.boolean("isCloseButtonVisible"),
    },
    example: (props) => (
      <>
        <Toast />
        <Button onClick={() => showToast(props)}>トーストを表示</Button>
      </>
    ),
  }
);
