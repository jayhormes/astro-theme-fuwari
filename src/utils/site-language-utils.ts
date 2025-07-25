import { siteConfig } from "../config";
import type { SupportedLanguage } from "../config";

/**
 * Get the default language key from siteConfig
 * Maps siteConfig.lang (like 'zh_TW') to URL key (like 'zh-tw')
 */
export function getSiteDefaultLanguage(): SupportedLanguage {
    const langMap: Record<string, SupportedLanguage> = {
        'zh_TW': 'zh-tw',
        'zh_CN': 'zh-cn',
        'ja': 'ja',
        'ko': 'ko',
        'es': 'es',
        'th': 'th',
        'en': 'en'
    };
    return langMap[siteConfig.lang] || 'en';
}

/**
 * Get the default locale for Astro i18n config from siteConfig.lang
 */
export function getAstroDefaultLocale(): string {
    return getSiteDefaultLanguage();
}

/**
 * Check if a language is the site's default language
 */
export function isDefaultLanguage(lang: string): boolean {
    return lang === getSiteDefaultLanguage();
}

/**
 * Generate correct URL for language switching
 */
export function getLanguageUrl(targetLang: string, basePath: string): string {
    const defaultLang = getSiteDefaultLanguage();
    const result = targetLang === defaultLang ? basePath : `/${targetLang}${basePath}`;
    return result;
}
