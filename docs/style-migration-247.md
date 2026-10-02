# Figma スタイル更新 #247（2026-10-02）

一次情報は Figma の「スタイル更新」アノテーション。
全56ページ・374注釈の監査記録は [internal の記録](https://github.com/goodpatch/sparkle-design-internal/tree/chore/247-style-audit-20261002/docs/figma-style-check/247-2026-10-02)。

## API と consumer の移行

- Icon/Spinner: size=6を22pxとして追加。旧size6〜12で実寸を維持する参照は7〜13に変更。character段階は据え置き。Code Connect・サンプル・同梱スキルを追随。
- Badge: 従来xs（8px）は2xsに変更。新xsは14px。Code Connectのsize軸も追随。
- Tag: body=none/statusを追加。ステータスドットは装飾としてaria-hidden。色・最小高さ・leadingTrim・余白は注釈を採用。
- Textarea: sizeはmd/lgへ変更。smの呼び出しはmdへ移行。横幅はw-fullでconsumerのレイアウトに従う。最小高さ128px。
- Button/フォーム入力/Checkbox/Radio/Tabs/Link: 注釈の縮小文字・余白へ追随。
- Dialog/Modal: 共通Overlayに合成しsurface/overlayへ統一。RadixのPortal・開閉・フォーカス制御を維持。Dialog Footerはmd、Modal Closeはsm。

## 保留・実装範囲

gray/50・gray/500はFigma内部のVariables／実体と色票HEXラベルの不一致が残るため採用値確認待ち。
TextareaのCounterは公開APIに存在せず、Resize handleはnative UI。これらを注釈対応済みとは扱わない。
全variantの画像差分と最終デザインレビューは未完了。

## 依存順序

variables → CLI次beta → 公開ライブラリ次beta → internalのdevDep/lockfile更新 → docs・共有スキル配布同期。
未リリースCLIの挙動を案内するため、対応CLIがnpm公開されるまでスキル更新を配布しない。
