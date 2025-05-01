"use client";

import { Button } from "@/components/button";
import { Radio, RadioItem } from "@/components/radio";
import { client } from "@figma/code-connect";
import { useState } from "react";

const hostname = "sparkle-ui.vercel.app";
const registries = [
  "sparkle-style",
  "sparkle-color",
  "sparkle-font",
  "button",
  "checkbox",
  "icon",
  "spinner",
];

export default function Home() {
  const [target, setTarget] = useState<string>(
    `https://${hostname}/r/sparkle-style.json`
  );

  const handleOpen = () => {
    open(`https://v0.dev/chat/api/open?url=${target}`, "_blank");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(`https://${hostname}/r/${e.target.value}.json`);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-3xl font-bold">Open in v0</h1>
      <Radio defaultValue="sparkle-style" onChange={handleChange}>
        {registries.map((registry) => (
          <RadioItem
            key={registry}
            value={registry}
            id={registry}
            label={registry}
          />
        ))}
      </Radio>
      <div className="flex gap-4">
        <Button variant="solid" theme="primary" size="lg" onClick={handleOpen}>
          Open in v0
        </Button>
        <Button
          variant="solid"
          theme="secondary"
          size="lg"
          onClick={() => {
            open(target, "_blank");
          }}
        >
          Preview JSON
        </Button>
      </div>
      <pre className="w-full max-w-2xl overflow-x-auto rounded-lg bg-gray-100 p-4">
        <code className="text-sm text-gray-800">{`
{
  "mcpServers": {
    "shadcn": {
      "command": "npx",
      "args": ["-y", "shadcn@canary", "registry:mcp"],
      "env": {
        "REGISTRY_URL": "https://${hostname}/r/sparkle-style.json"
      }
    }
  }
}`}</code>
      </pre>
    </main>
  );
}
