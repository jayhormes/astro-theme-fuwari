# 多語言配置指南 / Language Configuration Guide

本系統支援動態語言配置，您可以根據需求啟用或停用特定語言。

## 可用語言 / Available Languages

系統內建支援以下語言：

- **英文 (English)** - `en` - 🇺🇸
- **繁體中文 (Traditional Chinese)** - `zh-tw` - 🇹🇼
- **簡體中文 (Simplified Chinese)** - `zh-cn` - 🇨🇳
- **日文 (Japanese)** - `ja` - 🇯🇵
- **韓文 (Korean)** - `ko` - 🇰🇷
- **西班牙文 (Spanish)** - `es` - 🇪🇸
- **泰文 (Thai)** - `th` - 🇹🇭

## 配置方法 / Configuration

### 1. 基本配置

在 `src/config.ts` 中找到 `enabledLanguages` 陣列：

```typescript
// User-configurable languages - modify this array to enable/disable languages
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw", "zh-cn", "ja"];
```

### 2. 啟用所有語言

如果您想啟用所有語言：

```typescript
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw", "zh-cn", "ja", "ko", "es", "th"];
```

### 3. 僅啟用特定語言

例如僅啟用英文和中文：

```typescript
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw", "zh-cn"];
```

### 4. 最小配置（僅英文）

```typescript
export const enabledLanguages: AvailableLanguage[] = ["en"];
```

## 技術說明 / Technical Details

### 系統架構

1. **availableLanguages**: 定義所有可用語言的完整列表
2. **enabledLanguages**: 使用者配置的啟用語言清單
3. **getSupportedLanguages()**: 動態函式，根據啟用的語言回傳支援的語言物件

### 自動更新的組件

當您修改 `enabledLanguages` 時，以下組件會自動更新：

- **語言選擇器** (LanguageSelector.astro) - 下拉選單中只顯示啟用的語言
- **SEO 標籤** (HrefLang.astro) - 只生成啟用語言的 hreflang 標籤
- **路由生成** ([lang].astro) - 只生成啟用語言的頁面路由
- **Astro i18n 配置** (astro.config.mjs) - 自動同步 locales 設定

### 建置結果

- 4 種語言啟用：生成 16 個頁面（包含 /zh-tw/, /zh-cn/, /ja/ 路由）
- 7 種語言啟用：生成 19 個頁面（額外包含 /ko/, /es/, /th/ 路由）

## 注意事項 / Important Notes

1. **英文為預設語言**：英文 (`en`) 必須包含在配置中，作為預設語言
2. **翻譯完整性**：所有啟用的語言都已包含完整的翻譯檔案
3. **SEO 友善**：系統會自動生成適當的 hreflang 和 canonical 標籤
4. **URL 結構**：
   - 英文：`/` (預設，無語言前綴)
   - 其他語言：`/{lang}/` (如 `/zh-tw/`, `/ja/`)

## 範例配置 / Example Configurations

### 多語系部落格（亞洲市場）
```typescript
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw", "zh-cn", "ja", "ko"];
```

### 多語系部落格（全球市場）
```typescript
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw", "zh-cn", "ja", "ko", "es", "th"];
```

### 雙語部落格（中英）
```typescript
export const enabledLanguages: AvailableLanguage[] = ["en", "zh-tw"];
```

修改配置後，執行 `npm run build` 重新建置即可看到效果。
