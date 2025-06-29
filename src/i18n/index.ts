// src/i18n/index.ts
import en from "./messages/en.json";
import es from "./messages/es.json";
import jp from "./messages/jp.json";

export function getTranslations(lang: string) {
	switch (lang) {
		case "es":
			return es;
		case "jp":
			return jp;
		default:
			return en;
	}
}
