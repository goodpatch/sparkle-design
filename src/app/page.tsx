import { Button } from "@/components/button";
import { Radio, RadioItem } from "@/components/radio";
import { useState } from "react";

const hostname = process.env.NEXT_PUBLIC_V0_HOSTNAME || "localhost";
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
    `${hostname}/r/sparkle-style.json`
  );

  const handleOpen = () => {
    open(`https://v0.dev/chat/api/open?url=${target}`, "_blank");
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(`${hostname}/r/${e.target.value}.json`);
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
      <Button variant="solid" theme="primary" size="lg" onClick={handleOpen}>
        Open in v0
      </Button>
    </main>
  );
}
