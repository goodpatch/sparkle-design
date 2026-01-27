# Toast コンポーネント アクセシビリティレビュー

**レビュー日時**: 2026-01-27
**対象コンポーネント**: `src/components/ui/toast/`
**レビュー範囲**: コンポーネント実装、テスト、Storybookストーリー

---

## 📊 サマリー

| 結果 | 件数 |
|------|------|
| ✅ Pass | 22 |
| ❌ Fail | 4 |
| ⚠️ Needs Review | 3 |
| N/A | 2 |
| **合計** | **31** |

### 重大な問題 (Critical)

1. **4.1.3 状態メッセージ**: トーストがaria-live属性を持つが、通知内容が支援技術に適切に伝わらない可能性
2. **1.1.1 非テキストコンテンツ**: 閉じるボタンのアクセシブルネームが不足
3. **2.5.3 ラベルを含む名前**: 閉じるボタンの可視ラベルとアクセシブルネームの不一致

### 主なリスク

- トーストの通知内容が支援技術ユーザーに確実に伝わらない
- 閉じるボタンが音声入力で操作できない可能性
- IconButtonのaria-labelが設定されていない

---

## 🔍 詳細な検証結果

| ID | 項目 | レベル | 確認ポイント | 結果 | エビデンス | 推奨される修正 |
|----|------|--------|-------------|------|-----------|---------------|
| 1.1.1 | 非テキストコンテンツ | A | アイコンのみ等の非テキストコンテンツに等価な代替テキストがある | ❌ Fail | `index.tsx:90-100` 閉じるボタンに aria-label が未設定。IconButtonは icon="close" のみで、アクセシブルネームを提供していない | IconButtonに `aria-label="閉じる"` を追加: `<IconButton icon="close" aria-label="閉じる" ... />` |
| 1.3.4 | 表示の向き | AA | コンテンツの表示を特定の向きに限定していない | ✅ Pass | `index.tsx:82` 固定幅 (w-[320px]) だが、向き制限は無い | - |
| 1.3.5 | 入力目的の特定 | AA | autocomplete属性が適切に設定 | N/A | トーストは入力フィールドを持たない | - |
| 1.4.1 | 色の使用 | A | 情報を色だけで伝えていない | ✅ Pass | Figma/デザインシステムで保証。コード上でトークン逸脱なし (`bg-neutral-50`, `text-text-high` 等) | - |
| 1.4.3 | コントラスト（最低限） | AA | テキストコントラストが基準を満たす | ✅ Pass | Figma/デザインシステムで保証。`text-text-high` と `bg-neutral-50` の組み合わせ | - |
| 1.4.4 | テキストのサイズ変更 | AA | テキストが200%まで拡大可能 | ✅ Pass | `character-3-bold-pro`, `character-3-regular-pro` は相対サイズ。固定幅 `w-[320px]` だが、テキストは折り返す | - |
| 1.4.11 | 非テキストのコントラスト | AA | アイコン・境界線のコントラスト | ✅ Pass | `border-divider-middle` はデザインシステムで保証。閉じるアイコンは IconButton の theme="neutral" で保証 | - |
| 1.4.10 | リフロー | AA | 400%拡大で横スクロールなし | ✅ Pass | 固定幅だが、`top-center` 配置で画面中央。テキストは `flex-col` で縦に並ぶため、横スクロール不発生 | - |
| 1.4.13 | ホバー又はフォーカスで表示されるコンテンツ | AA | ホバー/フォーカスで出現するコンテンツの要件 | ⚠️ Needs Review | トーストは自動表示され、ホバー/フォーカストリガーではない。ただし、閉じるボタンにホバー時の挙動があるかは Storybook で要確認 | Storybookで閉じるボタンのホバー状態を確認 |
| 2.1.1 | キーボード | A | キーボードだけで操作できる | ⚠️ Needs Review | `index.test.tsx:42-44` Toaster は `aria-live="polite"` を持つ。閉じるボタンは IconButton で tabIndex/キーボード操作を保証。ただし、トースト自体にフォーカス移動する手段は未確認 | キーボードでトーストにアクセスし、閉じるボタンを操作できるか Storybook で検証 |
| 2.1.2 | キーボードトラップなし | A | フォーカスが閉じ込められない | ✅ Pass | トーストは `aria-live` 領域で、フォーカストラップを作らない。閉じるボタンは通常のフォーカスフロー | - |
| 2.1.4 | 文字キーのショートカット | A | 単一キーショートカットの無効化/変更 | N/A | トーストにショートカット機能はない | - |
| 2.4.3 | フォーカス順序 | A | フォーカス移動が論理的 | ✅ Pass | `index.tsx:86-100` タイトル → 説明 → 閉じるボタンの DOM 順序は論理的 | - |
| 2.4.7 | フォーカスの可視化 | AA | フォーカスインジケータが視認可能 | ✅ Pass | IconButton は `:focus-visible` スタイルを継承 (Button コンポーネントのスタイル) | - |
| 2.4.11 | 隠されないフォーカス（最低限） | AA | フォーカス要素が隠れない | ✅ Pass | `top-center` 配置で固定。`position: "top-center"` (index.tsx:122) により画面上部中央に表示され、隠れない | - |
| 2.4.13 | フォーカスの外観 | AAA | フォーカスインジケータの太さ・コントラスト | ✅ Pass | IconButton のフォーカススタイルはデザインシステムで保証 | - |
| 2.5.1 | ポインタジェスチャ | A | 複雑操作が単一操作で代替可能 | ✅ Pass | 閉じるボタンは単純な `onClick` のみ | - |
| 2.5.2 | ポインタ取消 | A | アクションをポインタDownで確定させていない | ✅ Pass | `index.tsx:96` IconButton の `onClick` で実装。`onPointerDown` 等は使用していない | - |
| 2.5.3 | ラベルを含む名前 | A | 可視ラベルがアクセシブルネームに含まれる | ❌ Fail | 閉じるボタンは可視ラベルなし（アイコンのみ）。アクセシブルネームも未設定。音声入力で「閉じる」と言っても操作できない | IconButton に `aria-label="閉じる"` を追加し、可視ラベルがないことを補完 |
| 2.5.4 | モーション起動 | A | デバイス動作以外でも操作可能 | ✅ Pass | トーストはデバイスモーション非依存 | - |
| 2.5.7 | ドラッグ操作 | AA | ドラッグ以外の代替操作 | ✅ Pass | ドラッグ操作なし | - |
| 2.5.8 | ターゲットサイズ（最小） | AA | 操作対象は24×24px以上 | ✅ Pass | IconButton `size="sm"` は 32×32px (Button コンポーネントの `h-8` = 32px) | - |
| 3.2.1 | フォーカス時 | A | フォーカスで予期しない動作が起きない | ✅ Pass | 閉じるボタンのフォーカスで副作用なし | - |
| 3.2.2 | 入力時 | A | 入力で意図しない動作が起きない | ✅ Pass | 入力フィールドなし | - |
| 3.2.4 | 一貫した識別性 | AA | 同じコンポーネントは一貫したラベル | ✅ Pass | トーストのラベル/構造は一貫している | - |
| 3.3.1 | エラーの特定 | A | 入力エラーが利用者に伝わる | ✅ Pass | トーストは入力要素を持たない。トースト自体がエラー通知に使用可能 | - |
| 3.3.2 | ラベル又は説明 | A | 入力欄にラベル/説明がある | ✅ Pass | 入力欄なし | - |
| 3.3.3 | エラー修正方法の提案 | AA | 修正方法が提示されている | ✅ Pass | トースト自体に提案機能は期待されない。エラー内容を `description` で表示可能 | - |
| 3.3.8 | アクセシブル認証（最低限） | AA | 認証が記憶依存でない | ✅ Pass | 認証機能なし | - |
| 4.1.2 | 名前・役割・値 | A | 操作要素がアクセシブルネーム/role/状態を持つ | ❌ Fail | `index.tsx:90-100` 閉じるボタンは IconButton で role="button" を保証。ただし、aria-label が未設定でアクセシブルネームが不足 | IconButton に `aria-label="閉じる"` を追加 |
| 4.1.3 | 状態メッセージ | AA | 重要な状態変化が支援技術に伝わる | ❌ Fail | `index.test.tsx:42-44` Sonner の Toaster は `aria-live="polite"` を持つが、トーストコンテンツが適切に通知されるかは不明。`title` と `description` が live region 内で適切にアナウンスされるか要検証 | 1. トースト表示時に `role="status"` または `aria-live="polite"` を確認<br>2. `title` を `<p role="status">` でラップするか、Toaster の設定で `aria-live` の挙動を確認<br>3. スクリーンリーダーテストでアナウンス内容を検証 |

---

## 🛠️ アクションアイテム

### 優先度: High

#### 1. 閉じるボタンにアクセシブルネームを追加 (1.1.1, 2.5.3, 4.1.2)

**問題**: 閉じるボタンは `icon="close"` のみで、`aria-label` が設定されていない。音声入力ユーザーや支援技術ユーザーが操作できない。

**修正**: [index.tsx:90-100](src/components/ui/toast/index.tsx#L90-L100)

```tsx
{isCloseTrigger && (
  <IconButton
    icon="close"
    size="sm"
    variant="ghost"
    theme="neutral"
    aria-label="閉じる"  // ← 追加
    onClick={() => {
      sonnerToast.dismiss(id);
    }}
  />
)}
```

**検証方法**:
- スクリーンリーダー(NVDA/JAWS/VoiceOver)で「閉じる ボタン」と読み上げられることを確認
- 音声入力で「閉じる をクリック」で操作できることを確認

---

#### 2. 状態メッセージの通知を検証・改善 (4.1.3)

**問題**: Toaster は `aria-live="polite"` を持つが、トーストの `title` と `description` が支援技術に適切にアナウンスされるか未確認。

**検証手順**:

1. **スクリーンリーダーテスト**:
   - NVDA/JAWS (Windows) または VoiceOver (macOS) でトーストを表示
   - 「カウントアップしました (1)」「最新の変更が反映されました」とアナウンスされるか確認
   - アナウンスされない場合、Sonner の設定または Toast コンポーネントの構造を見直す

2. **改善案 (必要に応じて)**:

```tsx
// index.tsx の Toast コンポーネント
export function Toast({
  className,
  title,
  description,
  isCloseTrigger = true,
  id,
}: ToastProps) {
  return (
    <div
      role="status"  // ← 追加
      aria-live="polite"  // ← 追加 (Sonner が既に提供している場合は不要)
      className={cn(
        "shadow-float px-3 py-2 text-text-high flex w-[320px] rounded-notice gap-2 bg-neutral-50 border border-divider-middle",
        className
      )}
    >
      <div className="h-full flex flex-col justify-center gap-0 px-1 grow">
        {title && <p className="character-3-bold-pro">{title}</p>}
        <p className={cn("character-3-regular-pro")}>{description}</p>
      </div>
      {isCloseTrigger && (
        <IconButton
          icon="close"
          size="sm"
          variant="ghost"
          theme="neutral"
          aria-label="閉じる"
          onClick={() => {
            sonnerToast.dismiss(id);
          }}
        />
      )}
    </div>
  );
}
```

**注意**: Sonner が既に `aria-live` を管理している場合、重複を避けるため、Sonner の挙動を優先する。`role="status"` の追加で十分な可能性もある。

**検証方法**:
- スクリーンリーダーで複数回トーストを表示し、毎回アナウンスされることを確認
- `title` あり/なしの両パターンで検証

---

### 優先度: Medium

#### 3. キーボード操作の検証 (2.1.1)

**要確認事項**:
- キーボードでトーストの閉じるボタンにフォーカスできるか
- Tab キーでフォーカスが期待通りに移動するか
- トースト表示中に他の要素からフォーカスが移動する場合、適切なフォーカス管理がされているか

**検証方法**:
- Storybook の Default ストーリーで「トーストを表示」ボタンをクリック
- Tab キーでフォーカスを移動し、閉じるボタンにフォーカスできることを確認
- Enter/Space キーで閉じるボタンが機能することを確認

**期待される挙動**: トーストは通知領域 (`aria-live`) のため、自動的にフォーカスを奪わない。ユーザーは Tab でフォーカスを移動して閉じるボタンを操作できる。

---

#### 4. ホバー時の挙動確認 (1.4.13)

**要確認事項**:
- 閉じるボタンにホバー時のツールチップやポップオーバーがあるか
- ある場合、ホバーを外してもコンテンツが残るか、ポインターを当ててホバーできるか

**検証方法**:
- Storybook でトーストを表示し、閉じるボタンにマウスホバー
- 特別な挙動がない場合は Pass

---

## 📝 テストケースの追加推奨

### 1. アクセシブルネームのテスト

```tsx
it("閉じるボタンにaria-labelが設定される", () => {
  // Given: Toastをレンダリングする
  testContainer.render(<Toast title="テスト" description="テスト" />);

  // Then: 閉じるボタンにaria-labelが付与される
  const closeButton = testContainer.queryButton();
  expect(closeButton.getAttribute("aria-label")).toBe("閉じる");
});
```

### 2. 状態メッセージのテスト

```tsx
it("Toasterにaria-live属性が設定される", () => {
  // Given: Toasterをレンダリングする
  testContainer.render(<Toaster />);

  // Then: aria-live="polite"を持つ要素が存在する
  const liveRegion = document.querySelector('[aria-live="polite"]');
  expect(liveRegion).not.toBeNull();
});

it("Toastにrole=statusが設定される", () => {
  // Given: Toastをレンダリングする
  testContainer.render(<Toast title="ステータス" description="テスト" />);

  // Then: role="status"が設定される
  const toast = testContainer.getContainer().firstElementChild;
  expect(toast?.getAttribute("role")).toBe("status");
});
```

---

## 🔗 参考資料

- **WCAG 1.1.1 Non-text Content**: https://www.w3.org/WAI/WCAG21/Understanding/non-text-content.html
- **WCAG 2.5.3 Label in Name**: https://www.w3.org/WAI/WCAG21/Understanding/label-in-name.html
- **WCAG 4.1.2 Name, Role, Value**: https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html
- **WCAG 4.1.3 Status Messages**: https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html
- **ARIA Live Regions**: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions

---

## ✅ 次のステップ

1. ✅ 閉じるボタンに `aria-label="閉じる"` を追加
2. ⚠️ スクリーンリーダーで状態メッセージの通知を検証
3. ⚠️ 必要に応じて `role="status"` を Toast コンポーネントに追加
4. ✅ テストケースを追加して自動検証
5. ⚠️ Storybook でキーボード操作とホバー挙動を確認

---

**レビュー担当**: Claude (accessibility-checker スキル)
**最終更新**: 2026-01-27
