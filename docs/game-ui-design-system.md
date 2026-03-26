# Retro Portfolio Design System

## 1. 目的

このデザインシステムは、`Shota Kazuno Portfolio` のゲーム風UIを一貫したルールで運用するための設計書です。  
単なる見た目の定義ではなく、以下を目的にします。

- 8bit / arcade / sci-fi の世界観を崩さずに画面追加できる
- React 実装時に迷わないトークンとコンポーネント粒度を持つ
- 将来的にプロフィール編集画面や公開プレビュー画面へ展開できる
- 見た目の派手さと、可読性・保守性・アクセシビリティを両立する

---

## 2. デザイン原則

### 2.1 World First

UI は単なる装飾ではなく「ゲーム世界のHUD」であることを優先する。

- 情報はパネル、カード、ターミナル、マップなどゲーム文脈で提示する
- 余白・色・タイポグラフィは演出よりも可読性を損なわない範囲で使う
- 画面全体にノイズやグローを使っても、本文は常に読めるコントラストを保つ

### 2.2 Pixel With Structure

ピクセル風でも、情報設計はモダンなプロダクトUIの考え方で組む。

- 情報の優先順位はサイズ、色、余白で表現する
- 役割の違うカードは色とラベルで明確に区別する
- レイアウトは感覚ではなくグリッドと spacing token で管理する

### 2.3 Loud Surface, Calm Content

背景や装飾は華やかに、本文領域は安定して読むことができる状態を維持する。

- 背景は派手でもコンテンツ面は比較的落ち着いた panel color を使う
- 文字情報が多い領域は panel 内に閉じ込める
- 1画面内で強いアクセント色は 2-3 色までに抑える

### 2.4 Playable Navigation

ゲーム風UIなので、操作可能な要素は「押せる」「切り替わる」「選ばれている」が明快であること。

- hover, focus, active, selected を必ず定義する
- ボタン、ランドマーク、チップは状態差分が視覚的に明確であること
- キーボード操作やフォーカス表示も演出の一部として設計する

---

## 3. ブランド世界観

### 3.1 キーワード

- Retro Arcade
- Pixel Fantasy
- Mobility x Hardware x Frontend
- Sci-fi HUD
- Technical Craftsmanship

### 3.2 UI トーン

- 夜空、ネオン、スキャンライン、ホログラム
- 厚みのある panel と多重 border
- 強い見出しと細かな system label の対比
- 「ゲームのメニュー画面」と「技術ポートフォリオ」の中間

### 3.3 やってよいこと

- ピクセル調シャドウ
- グロー、オーロラ、光彩、粒子演出
- tab, quest, map, relic, inventory などゲーム語彙
- 強い見出しフォントと本文フォントの明確な切り分け

### 3.4 避けること

- フラットで無機質なSaaS UI
- 角丸中心の soft UI
- ガラスモーフィズム主体の透明すぎるコンポーネント
- 装飾が強すぎて本文が読めなくなる状態

---

## 4. Foundations

## 4.1 Color Tokens

現在の実装トークンをベースに、役割ごとに再定義します。

### Core Colors

| Token | Value | Role |
| --- | --- | --- |
| `--bg` | `#12091f` | アプリ全体の基本背景 |
| `--bg-deep` | `#06030f` | 最暗部、奥行き表現 |
| `--panel` | `#22123d` | 標準 panel 背景 |
| `--panel-2` | `#2b1950` | 浮いた panel / 強調面 |
| `--panel-3` | `#10081d` | 内側 panel / 凹み面 |
| `--text` | `#f7f0ff` | 基本文字色 |
| `--muted` | `#d8c6eb` | 補助テキスト |
| `--accent` | `#8cf3ff` | 情報・冷色アクセント |
| `--accent-2` | `#f8d15b` | 主要CTA / 警告なし強調 |
| `--accent-3` | `#ff87b7` | 選択・エネルギー感 |
| `--success` | `#8dff8a` | 成功・稼働状態 |
| `--danger` | `#ff7d7d` | 注意・危険状態 |

### Semantic Colors

| Semantic Token | Recommended Value | Usage |
| --- | --- | --- |
| `--color-surface-default` | `var(--panel)` | 基本面 |
| `--color-surface-raised` | `var(--panel-2)` | 浮いた要素 |
| `--color-surface-inset` | `var(--panel-3)` | 内側面 |
| `--color-text-primary` | `var(--text)` | 主テキスト |
| `--color-text-secondary` | `var(--muted)` | 補助テキスト |
| `--color-border-strong` | `#0e081b` | 外枠 |
| `--color-border-soft` | `rgba(255,255,255,0.08)` | 内枠 |
| `--color-brand-primary` | `var(--accent)` | HUD / ラベル |
| `--color-brand-secondary` | `var(--accent-2)` | CTA |
| `--color-brand-tertiary` | `var(--accent-3)` | 選択状態 |

### Mode / Theme Colors

現在のテーマは sky theme として扱う。

- `theme-night`: 基本テーマ
- `theme-sunset`: 暖色寄りの黄昏テーマ
- `theme-void`: サイバー寄りの暗色テーマ

将来的には下記命名に寄せると管理しやすいです。

- `data-theme="night"`
- `data-theme="sunset"`
- `data-theme="void"`

### Quest Variant Colors

`MAIN QUEST` と `SIDE QUEST` を視覚的に分離するためのバリアントを定義する。

| Variant | Base Tone | Usage |
| --- | --- | --- |
| `quest-main` | cyan / violet | 本業、主戦場 |
| `quest-support` | cyan / green | 補助業務、運用改善 |
| `quest-side` | amber / warm red | 副業、ブランド活動 |

推奨 semantic token:

- `--quest-main-border`
- `--quest-main-bg`
- `--quest-side-border`
- `--quest-side-bg`
- `--quest-side-text`

---

## 4.2 Typography

### Font Roles

| Role | Font | Usage |
| --- | --- | --- |
| Display / HUD | `Press Start 2P` | 見出し、ラベル、ボタン、数値強調 |
| Body | `DotGothic16` | 本文、説明、リスト |

### Type Scale

| Token | Recommended Size | Usage |
| --- | --- | --- |
| `--font-size-hero` | `clamp(2rem, 4.8vw, 4.2rem)` | Hero タイトル |
| `--font-size-h1` | `clamp(1.8rem, 3vw, 3rem)` | ページ主要見出し |
| `--font-size-h2` | `clamp(1.4rem, 2.4vw, 2.2rem)` | セクション見出し |
| `--font-size-body` | `1rem` | 標準本文 |
| `--font-size-label` | `0.72rem` | system label / HUD ラベル |
| `--font-size-ui-sm` | `0.68rem` | 小さめボタン、ナビ、リンク |
| `--font-size-ui-md` | `0.76rem` | 強調ボタン、開閉トリガー |
| `--font-size-note` | `0.64rem` | 補助ヒント、メーター上部、注釈 |

### Typographic Rules

- Hero と section heading は `Press Start 2P`
- 本文は `DotGothic16`
- ラベルは letter spacing を強めて HUD 感を出す
- 長文を `Press Start 2P` で表示しない
- `Press Start 2P` を使う UI 要素は、PC で `0.64rem` 未満にしない
- クリック可能な UI の文字は、見た目優先でも `0.68rem` を基準にする
- 補助ヒントだけ `0.64rem` を許容し、それ未満は使わない

---

## 4.3 Spacing

8px 基準で管理する。

| Token | Value |
| --- | --- |
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-7` | `32px` |
| `--space-8` | `40px` |
| `--space-9` | `54px` |

運用ルール:

- card padding は基本 `24px`
- inner panel は `14px - 16px`
- section 間は `54px`
- chip 間は `10px`
- grid gap は `14px` または `20px`

---

## 4.4 Radius / Border / Shadow

### Radius

このUIは角丸をほぼ使わない。

- 標準: `0`
- 円形エフェクトのみ `50%`

### Border

二重 border と pixel shadow を基本形にする。

| Token | Value | Usage |
| --- | --- | --- |
| `--border-panel-outer` | `4px solid #0e081b` | panel 外枠 |
| `--border-panel-inner` | `2px solid rgba(255,255,255,0.08)` | panel 内枠 |
| `--border-soft` | `2px solid rgba(255,255,255,0.08)` | 軽量要素 |
| `--border-strong` | `3px solid rgba(255,255,255,0.08)` | button / chip / card |

### Shadow

| Token | Value | Usage |
| --- | --- | --- |
| `--shadow-panel` | `0 0 0 4px #070211, 0 0 0 8px #3c2277, 0 24px 48px rgba(0,0,0,0.4)` | panel |
| `--shadow-button` | pixel-style double shadow | ボタン |
| `--shadow-glow-info` | glow cyan | 情報強調 |
| `--shadow-glow-energy` | glow pink / amber | 選択・エフェクト |

---

## 4.5 Motion

### Motion Principles

- 動きは「生存感」と「操作感」を出すために使う
- 常時動く要素は背景レイヤーか 3D scene に限定する
- コンテンツの可読性を壊すアニメーションは避ける

### Motion Tokens

| Token | Duration | Usage |
| --- | --- | --- |
| `--motion-fast` | `150ms` | hover, press |
| `--motion-base` | `200ms` | state transition |
| `--motion-panel` | `350ms` | scene / fade |
| `--motion-reveal` | `700ms` | section reveal |
| `--motion-float` | `3.2s - 4.4s` | object float |

### Standard Motions

- Hover: `translate(-2px, -2px)`
- Reveal: `opacity + translateY(24px -> 0)`
- Ambient: star twinkle, aurora drift, ring pulse
- Feedback: spark rise, meter fill, terminal typewriter

### Reduced Motion

`prefers-reduced-motion` 対応時は以下を弱める。

- typewriter を即時表示
- spark / float / aurora の停止または短縮
- meter animation の即時反映

---

## 4.6 Layout

### Page Width

- max content width: `1280px`
- narrow section: `980px`

### Grid Rules

- Hero: `2-column`
- World / Save Point: `2-column`
- Quest / Inventory / Trophy list: `responsive card grid`

### Breakpoints

| Breakpoint | Purpose |
| --- | --- |
| `1080px` | 2カラムから1カラムへ |
| `860px` | カードグリッドを1列へ |
| `640px` | padding / font / interactive sizing を縮小 |

---

## 5. Component System

## 5.1 Layer Model

このUIは次のレイヤーで構成する。

1. Atmosphere Layer
2. Navigation Layer
3. Content Surface Layer
4. Interactive Object Layer
5. Feedback Layer

### 1. Atmosphere Layer

- `page-noise`
- `scanlines`
- `stars`
- `aurora`
- `cursor-light`

責務:

- 世界観の保持
- 読みやすさを壊さない背景演出

### 2. Navigation Layer

- `topbar`
- `topbar__logo`
- `topbar__nav`

責務:

- ページ内の移動
- ブランド識別

### 3. Content Surface Layer

- `panel`
- `panel--inner`
- `story-panel`
- `location-panel`
- `quest-card`
- `inventory-card`
- `trophy`
- `save-point`

責務:

- 情報のまとまり
- ノイズ背景から本文を保護する

### 4. Interactive Object Layer

- `pixel-btn`
- `scene-chip`
- `landmark`
- `chip`
- `side-quest-link`

責務:

- 選択・移動・CTA
- 状態の即時フィードバック

### 5. Feedback Layer

- `system-message`
- `meter`
- `spark`
- `player-marker`
- active / selected / hover states

責務:

- 現在状態の可視化
- 活動感の付与

---

## 5.2 Core Components

### Panel

ベースコンポーネント。ほぼすべての情報表示の土台。

#### Anatomy

- outer border
- inner border overlay
- surface background
- content slot

#### Variants

- `panel/default`
- `panel/inner`
- `panel/highlight`
- `panel/side-quest`

#### Rules

- 装飾の多い背景上では必ず panel 上に本文を載せる
- padding は variants ごとに固定化する
- panel 同士の見た目差分は background と border の semantic token で作る

### Pixel Button

ゲームらしさを最も象徴するCTA。

#### Variants

- `button/primary`
- `button/ghost`
- `button/link-card`

#### States

- default
- hover
- focus-visible
- pressed
- disabled

#### Rules

- hover 時は `translate(-2px, -2px)`
- `primary` は amber
- `ghost` は dark violet + cyan text
- 1画面で primary CTA は多くても 1-2 個まで

### Chip

小さな属性表示。

#### Variants

- `chip/default`
- `chip/interactive`
- `chip/side`
- `chip/status`

#### Rules

- 説明ではなく、短いキーワードだけを入れる
- 4つ以上並ぶ場合は折り返し前提で設計する

### Quest Card

業務実績を表現する主力カード。

#### Anatomy

- quest type
- title
- description
- skill chips
- optional external links

#### Variants

- `quest-card/main`
- `quest-card/support`
- `quest-card/city`
- `quest-card/side`

#### Rules

- `SIDE QUEST` は必ず `MAIN QUEST` と別グループで置く
- 役割差は type label と border tone で表す
- 外部リンクがある場合は card 下部に link row を追加する

### Status Card

Hero 上の概要メタ情報。

#### Anatomy

- small label
- emphasized value

#### Rules

- 4つを基本単位とする
- 値は 1-2 行に収まる程度

### Meter

スキル・経験・状態の定量表示。

#### Anatomy

- topline label
- value label
- track
- fill

#### Rules

- 数値は装飾ではなく意味を持たせる
- fill color は semantic purpose と対応させる

### Scene Selector

3D オブジェクト切り替えUI。

#### Components

- `scene-shell`
- `scene-camera`
- `scene-chip`
- `terminal-card`

#### Rules

- selected state は border / transform で明示
- scene と log はセットで設計する

### World Map

キャリア年表のゲーム的表現。

#### Components

- `world-map`
- `landmark`
- `player-marker`
- `location-panel`

#### Rules

- landmark は keyboard 操作可能であること
- active location は map と detail panel の両方で同期させる
- 視覚演出よりも current position の分かりやすさを優先する

### Trophy Item

受賞歴や成果物の一覧表示。

#### Anatomy

- year badge
- title
- description
- external link

#### Rules

- year badge は一覧の視認性を上げるため固定サイズ
- 一覧性が重要なため、レイアウトは過度に装飾しない

### Save Point Card

コンタクトとプロフィール要約の最終導線。

#### Rules

- 「続きがある」感を出すため、終了画面ではなく中継地点として見せる
- 主要CTAを縦積みし、迷わず押せる構造にする

---

## 6. Component Hierarchy

推奨コンポーネント階層:

```text
App
└─ PublicPreviewPage
   ├─ AtmosphereLayer
   ├─ Topbar
   ├─ HeroSection
   │  ├─ StatusCard[]
   │  ├─ Meter[]
   │  ├─ PixelButton[]
   │  ├─ SystemLog
   │  └─ SceneViewer
   ├─ StorySection
   ├─ WorldSection
   │  ├─ WorldMap
   │  └─ LocationPanel
   ├─ QuestSection
   │  ├─ MainQuestGrid
   │  └─ SideQuestCard
   ├─ InventorySection
   ├─ TrophySection
   └─ SavePointSection
```

---

## 7. Naming Rules

CSS / component naming は次を基本とする。

### Block

- `panel`
- `quest-card`
- `scene-chip`
- `save-point`

### Element

- `panel__header`
- `quest-card__type`
- `save-point__card`

### Modifier

- `panel--inner`
- `quest-card--side`
- `pixel-btn--ghost`

### Semantic Variant Prefix

必要に応じて variant を semantic に寄せる。

- `is-active`
- `is-selected`
- `is-visible`
- `is-highlighted`

---

## 8. Accessibility

ゲーム風UIでも以下は必須。

### Contrast

- 本文は最低でも WCAG AA 相当を目指す
- cyan / pink / amber は暗背景上でのみ使う

### Focus

- `:focus-visible` は hover と同等以上に目立たせる
- transform のみでなく border や glow でも示す

### Keyboard

- `landmark`, `scene-chip`, `button`, link card はすべてキーボード操作可能
- world map の移動操作は補助情報を明示する

### Motion Safety

- 強い発光や常時点滅は避ける
- 反復アニメーションは速度を抑える

### Content Safety

- 演出テキストと本文テキストを混同しない
- 英語ラベルだけでなく本文は日本語で意味を補う

---

## 9. Implementation Guidance

## 9.1 Token Management

現状は `global.css` の `:root` に直接定義しているが、今後は以下の層に分けると拡張しやすい。

```text
tokens/
├─ color.css
├─ typography.css
├─ spacing.css
├─ motion.css
└─ elevation.css
```

または TypeScript と併用する場合:

```text
src/shared/design-system/
├─ tokens.ts
├─ themes.ts
├─ componentVariants.ts
└─ design-system.md
```

## 9.2 React Component Ownership

このリポジトリでは feature-first に沿って以下の責務分離がよい。

- `src/features/public-preview/ui`
  UI コンポーネント本体
- `src/features/public-preview/model`
  quest data, trophy data, link data
- `src/shared/ui`
  再利用が確定した汎用部品のみ

### shared に昇格してよい候補

- `Panel`
- `PixelButton`
- `Chip`
- `SectionHeading`

### feature に残すべき候補

- `WorldMap`
- `SceneViewer`
- `QuestSection`
- `SavePointSection`

---

## 10. Figma / Design File Structure

md を設計ファイルとする場合でも、Figma に移す前提で以下の構成を推奨する。

### Page Structure

1. `00 Foundations`
2. `01 Components`
3. `02 Patterns`
4. `03 Screens`
5. `04 Motion Notes`

### 00 Foundations

- Color tokens
- Typography scale
- Spacing scale
- Shadows / borders
- Theme variants

### 01 Components

- Button
- Panel
- Chip
- Quest Card
- Status Card
- Meter
- Link Card
- Landmark

### 02 Patterns

- Hero HUD
- Quest Grid
- Side Quest Spotlight
- World Map + Detail
- Contact Endcap

### 03 Screens

- Home / Hero
- World
- Main Quests
- Side Quest
- Trophy Room
- Save Point

### 04 Motion Notes

- reveal behavior
- object float
- scene tilt
- spark feedback

---

## 11. Next Step Proposal

この設計書の次にやるとよいこと:

1. `Panel`, `PixelButton`, `Chip`, `SectionHeading` を React コンポーネントとして切り出す
2. CSS token を semantic token に再整理する
3. `MAIN QUEST` / `SIDE QUEST` の variant を class ではなく design token で切り替えられるようにする
4. `prefers-reduced-motion` 対応を追加する
5. 将来的な編集画面向けに form component のデザインルールを追加する

---

## 12. Current Mapping to Code

実装上の主要参照先:

- design token source: `src/app/styles/global.css`
- page composition: `src/features/public-preview/ui/PortfolioPage.tsx`
- content model: `src/features/public-preview/model/portfolioData.ts`

この文書は、現状の実装を整理した v1 のデザインシステム設計書として扱う。
