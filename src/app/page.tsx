import { redirect } from "next/navigation";

export default function Home() {
  redirect("/storybook-static/index.html");
}
