# AGENTS.md

## このリポジトリの目的
このリポジトリは、自己紹介ポートフォリオ作成画面を中心とした React + TypeScript の Web アプリケーションです。  
ユーザーが、自分のプロフィール、スキル、経歴、実績、作品、連絡先などを分かりやすく編集・表示できることを目的とします。  
コードベースでは、可読性、保守性、運用安定性、拡張性、テストしやすさを最優先とします。

## 技術スタック
- React
- TypeScript
- Biome（フォーマット・Lint）
- Testing Library（ユニットテスト / インテグレーションテスト）
- Playwright（E2Eテスト）

## アーキテクチャ方針

### 1. feature-first 構成
コードは技術的な種類だけで分けず、業務機能単位で整理します。

推奨するトップレベル構成:

- `src/app`: アプリ起動処理、ルーター、Provider、レイアウト
- `src/shared`: 複数の機能で再利用する共通コードのみを配置
- `src/features/profile-editor`
- `src/features/portfolio-sections`
- `src/features/project-gallery`
- `src/features/public-preview`
- `tests/e2e`: Playwright のテスト
- `tests/page-objects`: 必要に応じた Playwright の Page Object

### 2. feature ごとに自己完結させる
各 feature は、以下の責務を自分で持つようにします。

- ドメインモデル / 型
- hooks
- UIコンポーネント
- feature 内でのみ使うユーティリティ
- fixture / テストデータ

推奨する feature 配下の構成:

- `model/`
- `hooks/`
- `ui/`
- `utils/`
- `fixtures/`
- `index.ts`

### 3. shared は小さく保つ
`src/shared` にコードを移すのは、複数の feature で本当に再利用される場合だけにします。  
feature 固有のコードを早い段階で shared に抽象化しすぎないでください。

### 4. 依存関係の向き
許可する依存方向は以下です。

`app/pages -> features -> shared`

ルール:
- feature は他の feature に直接依存してはいけません
- shared は feature に依存してはいけません
- 循環依存を避けてください
- feature 間の組み合わせは app / page レベルで行ってください

## ディレクトリ運用ルール

### app
`src/app` には以下を配置します。

- ルーター
- Provider
- アプリのエントリーポイント
- レイアウト
- グローバル状態の接続処理

### shared
`src/shared` には以下を配置します。

- 再利用可能な UI の基本部品
- 汎用 hooks
- ユーティリティ関数
- 共通型
- 複数 feature で使うテストヘルパー

### features
業務ロジックは、対応する feature ディレクトリの中に保持してください。

例:
- `src/features/profile-editor`
- `src/features/portfolio-sections`
- `src/features/project-gallery`
- `src/features/public-preview`

### tests
- ユニットテスト / インテグレーションテストは実装ファイルの近くに配置します
- E2Eテストは `src` の外に出し、`tests/e2e` に配置します

## コーディングルール

### 全般
- できるだけ小さく、単一責務のファイルを優先する
- 略語よりも意味が明確な名前を優先する
- 責務が混在した巨大コンポーネントを避ける
- 業務ロジックは JSX から外し、hooks、model helper、utility に移す
- page コンポーネントは薄く保つ

### React コンポーネント
コンポーネントは主に以下を担当します。

- 描画
- イベントのバインド
- hook の呼び出し
- props の受け渡し

重い業務ロジックをコンポーネント内に直接書かないでください。

### Hooks
hooks は以下の用途に使います。

- 画面全体の制御
- 派生状態の計算
- 入力状態や編集中状態の管理
- フォーム処理の流れ
- 副作用の調整

例:
- `useProfileEditor`
- `usePortfolioSections`
- `useProjectGalleryForm`
- `usePublicPreview`

### Model
`model/` は以下のために使います。

- ドメイン型
- enum / union
- バリデーションスキーマ
- 業務上の意味を持つ変換ルール

## 命名規則

### ファイル
- React コンポーネント: `PascalCase.tsx`
- hooks: `useXxx.ts`
- utils: `camelCase.ts`
- model / types: 意味の分かる小文字、または `*.types.ts`
- テスト: `*.test.ts` または `*.test.tsx`
- E2Eテスト: `*.spec.ts`

### 例
- `ProfileEditorPage.tsx`
- `useProfileEditor.ts`
- `formatCareerPeriod.ts`
- `portfolioSection.ts`
- `ProfileEditorPage.test.tsx`
- `profile-editor.spec.ts`

## export ルール
- `index.ts` は feature の公開APIとしてのみ使います
- 深い barrel export の連鎖は避けてください
- 可読性が高い場合は明示的な import を優先します

## テスト戦略

### ユニットテスト
以下に対してユニットテストを書きます。

- 純関数
- formatter
- validator
- 入力値の整形ロジック
- セクション変換ロジック
- 公開表示用のマッピングロジック

### インテグレーションテスト
Testing Library によるインテグレーションテストを、UI 挙動の主要なテスト層とします。  
実装詳細ではなく、ユーザーから見える振る舞いをテストしてください。

テスト例:
- プロフィール入力フォームの送信
- バリデーションメッセージの表示
- セクション追加 / 削除 / 並び替え
- プレビュー反映
- hook + UI の連携

### E2Eテスト
Playwright の E2E テストは、重要なユーザーフローのみに絞ってください。

優先するもの:
- ログイン / 認証フロー
- プロフィール入力から保存までのフロー
- 作品追加 / 編集 / 削除フロー
- 公開プレビュー確認フロー
- ポートフォリオ公開導線の確認

すべての境界値や細かい分岐を E2E に入れないでください。

## Testing Library ルール
- アクセシブルなクエリを優先する
- クエリの優先順位:
  1. `getByRole`
  2. `getByLabelText`
  3. `getByText`
  4. `getByPlaceholderText`
  5. `getByTestId` は最後の手段

以下のような内部実装の詳細はテストしないでください。

- コンポーネントの private state
- ユーザーから見えない DOM 構造
- 本当に必要な場合を除く CSS クラス名

## Playwright ルール
- 壊れにくいセレクタを優先する
- 可能であれば role / name ベースの locator を優先する
- Page Object は複雑な画面や繰り返し使うフローに限定する
- E2E シナリオは、現実的な end-to-end のユーザー成果に集中させる
- 認証済みセットアップは適切に再利用する

## Biome ルール
- Biome をフォーマットと Lint の唯一の基準とする
- Biome が強制しているスタイルについて手作業で議論しない
- 作業完了前に Biome のチェックを実行する
- 適切な場面では `import type` を優先する
- 常にコードベースを Biome 準拠の状態に保つ

## 変更時のルール
変更を行うときは、以下を守ってください。

1. 既存の feature 境界に従う
2. 関係のないリファクタを避ける
3. diff は小さく、レビューしやすく保つ
4. 振る舞い変更がある場合はテストを追加または更新する
5. 巧妙さより可読性を優先する

## レビューチェックリスト
変更を確定する前に、以下を確認してください。

- アーキテクチャルールに従っている
- 禁止された feature 間依存が追加されていない
- コンポーネントの責務が明確なままである
- テストが適切に追加 / 更新されている
- Biome が通る
- 命名とファイル配置がリポジトリ規約に合っている

## 新機能を追加するとき
- まずどの feature が責務を持つか決める
- shared コードは、複数 feature で本当に必要な場合だけ導入する
- 新しい構造を発明するより、既存パターンを拡張することを優先する
- feature が大きい場合は、実装前に短い実装計画を提示する

## ブランチ命名ルール

ブランチ名は以下の形式を使用します。

`<type>/<scope>-<summary>`

例:
- `feat/profile-editor-basic-info`
- `feat/project-gallery-add-form`
- `fix/public-preview-layout`
- `refactor/portfolio-feature-structure`
- `test/add-profile-editor-e2e`
- `chore/setup-biome`
- `docs/update-agents-md`

### type
- `feat`: ユーザー向け機能追加
- `fix`: バグ修正
- `refactor`: 主な機能変更を伴わないコードや構造の改善
- `test`: テスト追加またはテスト改善
- `chore`: ツール、CI、依存関係、設定、保守作業
- `docs`: ドキュメント更新

### ルール
- 英小文字のみを使う
- 単語はハイフンで区切る
- 短く、具体的な名前にする
- 1ブランチ1目的を原則とする
- `tmp`、`update`、`work`、`misc` のような曖昧な名前は避ける