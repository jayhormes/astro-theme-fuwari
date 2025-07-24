import { getSupportedLanguages, type SupportedLanguage } from "../config";

const supportedLanguages = getSupportedLanguages();

/**
 * Get the language from URL path
 */
export function getLanguageFromPath(path: string): SupportedLanguage {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (firstSegment && Object.keys(supportedLanguages).includes(firstSegment)) {
        return firstSegment as SupportedLanguage;
    }
    
    return 'en'; // default language
}

/**
 * Remove language prefix from path
 */
export function removeLanguageFromPath(path: string): string {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    if (firstSegment && Object.keys(supportedLanguages).includes(firstSegment)) {
        return '/' + segments.slice(1).join('/');
    }
    
    return path;
}

/**
 * Add language prefix to path
 */
export function addLanguageToPath(path: string, lang: SupportedLanguage): string {
    const cleanPath = removeLanguageFromPath(path);
    
    if (lang === 'en') {
        return cleanPath;
    }
    
    return `/${lang}${cleanPath}`;
}

/**
 * Get all language variations of a path
 */
export function getLanguageVariations(path: string): Record<SupportedLanguage, string> {
    const cleanPath = removeLanguageFromPath(path);
    const variations = {} as Record<SupportedLanguage, string>;
    
    for (const lang of Object.keys(supportedLanguages) as SupportedLanguage[]) {
        variations[lang] = addLanguageToPath(cleanPath, lang);
    }
    
    return variations;
}

/**
 * Check if a path has a language prefix
 */
export function hasLanguagePrefix(path: string): boolean {
    const segments = path.split('/').filter(Boolean);
    const firstSegment = segments[0];
    
    return firstSegment ? Object.keys(supportedLanguages).includes(firstSegment) : false;
}
