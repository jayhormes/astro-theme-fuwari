# 多語系部落格功能說明

## 實現的功能

### 1. 支援的語言
- 英文 (en) - 預設語言
- 繁體中文 (zh-tw) - 對應 zh_TW，使用台灣旗幟 🇹🇼
- 簡體中文 (zh-cn) - 對應 zh_CN，使用中國旗幟 🇨🇳
- 日文 (ja)

### 2. URL 結構
- 預設英文：`/` (不含語言前綴)
- 繁體中文：`/zh-tw/`
- 簡體中文：`/zh-cn/`
- 日文：`/ja/`

### 3. 中文語言精確處理
- **雙中文支援**：同時支援繁體中文和簡體中文
- **語言代碼標準化**：
  - 繁體中文：URL 路由 `zh-tw`，內部代碼 `zh_TW`，hreflang `zh-TW`
  - 簡體中文：URL 路由 `zh-cn`，內部代碼 `zh_CN`，hreflang `zh-CN`
- **地區化顯示**：
  - 繁體中文：台灣旗幟 🇹🇼，顯示「繁體中文」
  - 簡體中文：中國旗幟 🇨🇳，顯示「简体中文」
- **翻譯文件對應**：
  - 繁體中文使用 `zh_TW.ts` 翻譯文件
  - 簡體中文使用 `zh_CN.ts` 翻譯文件

### 3. 多語系路由
- 每個語言都有獨立的路由
- 支援語言前綴的 URL 結構
- 自動重定向到正確的語言版本

### 4. SEO 優化
- **hreflang 標籤**：自動生成所有語言版本的 hreflang 標籤
- **canonical URL**：正確的標準 URL
- **x-default**：英文版本作為預設語言
- **Open Graph locale**：支援多語系的 Open Graph 標籤

### 5. 導航欄語言選擇器
- 位於右上角導航欄
- 點擊/懸停顯示語言選項
- 包含國旗圖示和語言名稱
- 自動保持當前頁面的路徑結構

## 檔案結構

```
src/
├── config.ts                     # 新增 supportedLanguages 配置
├── components/
│   ├── LanguageSelector.astro    # 語言選擇器組件
│   ├── HrefLang.astro            # SEO hreflang 標籤組件
│   └── Navbar.astro              # 更新的導航欄
├── i18n/
│   ├── i18nKey.ts                # 新增語言選擇器相關的 key
│   ├── translation.ts            # 更新的翻譯函數
│   └── languages/
│       ├── en.ts                 # 更新的英文翻譯
│       ├── zh_CN.ts              # 更新的中文翻譯
│       └── ja.ts                 # 更新的日文翻譯
├── layouts/
│   └── Layout.astro              # 新增 HrefLang 組件
├── pages/
│   ├── [lang].astro              # 多語系首頁路由
│   └── [...path].astro           # 通用多語系路由 (備用)
├── utils/
│   └── language-utils.ts         # 語言處理實用工具
└── astro.config.mjs              # 新增 i18n 配置
```

## 使用方式

### 1. 新增翻譯內容
在 `src/i18n/i18nKey.ts` 中新增新的 key：
```typescript
enum I18nKey {
    // ... 現有的 keys
    newKey = "newKey",
}
```

在各語言檔案中新增對應翻譯：
```typescript
// en.ts
[Key.newKey]: "English translation",

// zh_CN.ts  
[Key.newKey]: "中文翻譯",

// ja.ts
[Key.newKey]: "日本語翻訳",
```

### 2. 在組件中使用翻譯
```typescript
import { i18n } from "../i18n/translation";
import I18nKey from "../i18n/i18nKey";

// 在組件中使用
const text = i18n(I18nKey.newKey);
```

### 3. 新增新的語言
1. 在 `config.ts` 的 `supportedLanguages` 中新增語言
2. 在 `src/i18n/languages/` 中新增語言檔案
3. 在 `translation.ts` 的 `map` 中新增對應
4. 在 `astro.config.mjs` 的 `locales` 中新增語言代碼

### 4. 創建多語系頁面
對於需要多語系版本的靜態頁面，可以使用以下模式：

```astro
---
// pages/example/[lang].astro
import { supportedLanguages } from "../../config";

export async function getStaticPaths() {
    return Object.keys(supportedLanguages)
        .filter(lang => lang !== 'en')
        .map(lang => ({
            params: { lang }
        }));
}

const { lang } = Astro.params;
const currentLang = lang || 'en';
---

<Layout lang={currentLang}>
    <!-- 頁面內容 -->
</Layout>
```

## 技術細節

### 語言檢測
- URL 路徑檢測：從 URL 的第一個段落檢測語言
- 預設語言：英文不需要 URL 前綴
- 備用機制：如果無法檢測到語言，預設為英文

### SEO 最佳實務
- 每個頁面都包含 hreflang 標籤指向所有語言版本
- 使用 x-default 指向英文版本
- 正確的語言和地區代碼映射

### URL 處理
- 自動處理語言前綴的添加和移除
- 保持路徑結構的一致性
- 支援相對和絕對 URL

## 測試

1. 啟動開發服務器：`npm run dev`
2. 訪問不同語言版本：
   - 英文：`http://localhost:4321/`
   - 中文：`http://localhost:4321/zh/`
   - 日文：`http://localhost:4321/ja/`
3. 檢查語言選擇器功能
4. 檢查頁面源碼中的 hreflang 標籤

## 下一步擴展

1. **內容管理系統**：為部落格文章新增多語系支援
2. **自動語言檢測**：根據瀏覽器語言自動重定向
3. **語言切換動畫**：新增更平滑的語言切換效果
4. **RTL 支援**：支援右到左的語言（如阿拉伯文）
5. **日期/數字格式化**：根據語言格式化日期和數字
