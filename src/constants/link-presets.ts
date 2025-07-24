import I18nKey from "@i18n/i18nKey";
import { i18n } from "@i18n/translation";
import { LinkPreset, type NavBarLink } from "@/types/config";

export function getLinkPresets(lang?: string): { [key in LinkPreset]: NavBarLink } {
	return {
		[LinkPreset.Home]: {
			name: i18n(I18nKey.home, lang),
			url: "/",
		},
		[LinkPreset.About]: {
			name: i18n(I18nKey.about, lang),
			url: "/about/",
		},
		[LinkPreset.Archive]: {
			name: i18n(I18nKey.archive, lang),
			url: "/archive/",
		},
		[LinkPreset.Gallery]: {
			name: i18n(I18nKey.gallery, lang),
			url: "/gallery/",
		},
		[LinkPreset.Projects]: {
			name: i18n(I18nKey.projects, lang),
			url: "/projects/",
		},
	};
}

// For backward compatibility - uses default language
export const LinkPresets: { [key in LinkPreset]: NavBarLink } = getLinkPresets();
