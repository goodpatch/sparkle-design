import { beforeAll } from "vitest";
import { setProjectAnnotations } from "@storybook/experimental-nextjs-vite";
import * as projectAnnotations from "./preview";

// テスト実行時に正しい設定を適用する重要なステップです。
// en: This is an important step to apply the right configuration when testing your stories.
// 詳細はこちら
// en: More info at: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
const project = setProjectAnnotations([projectAnnotations]);

beforeAll(project.beforeAll);
