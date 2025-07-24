import { siteConfig } from "../config";
import { getLanguageFromPath } from "../utils/language-utils";
import type I18nKey from "./i18nKey";
import { en } from "./languages/en";
import { es } from "./languages/es";
import { ja } from "./languages/ja";
import { ko } from "./languages/ko";
import { th } from "./languages/th";
import { zh_CN } from "./languages/zh_CN";
import { zh_TW } from "./languages/zh_TW";

export type Translation = {
	[K in I18nKey]: string;
};

const defaultTranslation = en;

const map: { [key: string]: Translation } = {
	es: es,
	en: en,
	en_us: en,
	en_gb: en,
	en_au: en,
	zh_cn: zh_CN,
	"zh-cn": zh_CN, // Map URL route 'zh-cn' to zh_CN translation
	zh_tw: zh_TW,
	"zh-tw": zh_TW, // Map URL route 'zh-tw' to zh_TW translation
	ja: ja,
	ja_jp: ja,
	ko: ko,
	ko_kr: ko,
	th: th,
	th_th: th,
};

export function getTranslation(lang: string): Translation {
	return map[lang.toLowerCase()] || defaultTranslation;
}

export function i18n(key: I18nKey, lang?: string): string {
	// If lang is provided, use it; otherwise try to get from current path or fall back to site config
	const currentLang = lang || 
		(typeof window !== 'undefined' ? getLanguageFromPath(window.location.pathname) : null) ||
		siteConfig.lang;
	return getTranslation(currentLang)[key];
}
