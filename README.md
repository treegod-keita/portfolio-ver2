# portfolio-ver2

## 1. プロジェクト概要

Astroでの実装練習を兼ねて制作している、自身のポートフォリオサイトです。

## 2. デモURL

[https://example.com](https://example.com)
<!-- 実際のデプロイ先が決まり次第、URLを更新します -->

## 3. 使用技術

| カテゴリ | 技術 |
| --- | --- |
| フレームワーク | [Astro](https://astro.build/) |
| 言語 | TypeScript |
| パッケージマネージャー | pnpm |
| Lint / Format | ESLint（Flat Config）、Prettier |
| ページ遷移 | [Swup](https://swup.js.org/)（導入予定） |
| 3D表現 | [Three.js](https://threejs.org/)（導入予定） |
| デプロイ先 | Cloudflare（予定・未確定） |

## 4. ディレクトリ構成

```
.
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   └── Welcome.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── .gitignore
├── .prettierrc.cjs
└── AGENTS.md
```

## 5. セットアップ手順（開発環境の作り方）

### 前提

- Node.js `24.14.1`（[Volta](https://volta.sh/)を利用している場合は自動でこのバージョンが適用されます）
- pnpm

### 手順

```bash
# リポジトリをクローン
git clone <このリポジトリのURL>
cd portfolio-ver2

# 依存関係のインストール
pnpm install

# 開発サーバーの起動
pnpm dev
```

起動後、ブラウザで `http://localhost:4321` にアクセスすると確認できます。

## 6. 主要コマンド一覧

| コマンド | 説明 |
| --- | --- |
| `pnpm dev` | 開発サーバーを起動 |
| `pnpm build` | 本番用にビルド |
| `pnpm preview` | ビルド結果をローカルでプレビュー |
| `pnpm lint` | ESLintでコードをチェック |
| `pnpm lint:fix` | ESLintで自動修正可能な箇所を修正 |
| `pnpm format` | Prettierでコードを整形し、続けて`lint:fix`を実行 |

## 7. Lint / Format について

- **ESLint**（Flat Config形式）と**Prettier**を導入しています。
- Astro（`.astro`）、TypeScript、未使用importの検出などをチェックしています。
- 設定内容や導入時に検討した経緯については、社内Notionにまとめています。