/**
 * Copyright 2026 Goodpatch Inc.
 * SPDX-License-Identifier: Apache-2.0
 */
/**
 * SparkleHead - フォント読み込みコンポーネント
 *
 * sparkle-design-cli generate により sparkle.config.json から自動生成されます。
 * ルートレイアウトの <head> 内に配置してください。
 *
 * @example
 * import { SparkleHead } from "./SparkleHead";
 *
 * export default function RootLayout({ children }) {
 *   return (
 *     <html>
 *       <head>
 *         <SparkleHead />
 *       </head>
 *       <body>{children}</body>
 *     </html>
 *   );
 * }
 */
export function SparkleHead() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:FILL,wght@0..1,500&display=block" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=BIZ+UDPGothic:wght@400;700&display=swap" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=BIZ+UDGothic:wght@400;700&display=swap" />
    </>
  );
}
