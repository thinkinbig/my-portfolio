import { en } from './locales/en';
import { zh } from './locales/zh';
import { de } from './locales/de';

export const i18n = {
  en,
  zh,
  de,
} as const;

export type Language = keyof typeof i18n;
export type I18nKey = keyof typeof en;

export function getI18nText(lang: Language, key: string) {
  return key.split('.').reduce<unknown>((obj, key) => 
    (obj as Record<string, unknown>)[key], 
    i18n[lang]
  ) as string;
} 