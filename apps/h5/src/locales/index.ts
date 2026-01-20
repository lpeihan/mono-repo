import { Locale } from 'vant';
import { createI18n } from 'vue-i18n';

import { storage } from '../utils';

import zhCN from './zh-CN';

const DEFAULT_LANG = 'zh-CN';

// https://github.com/lokalise/i18n-ally/tree/main/locales
export const SUPPORTED_LOCALES = [
  // { text: '🇨🇳 繁體中文', value: 'zh-TW' },
  { text: '🇨🇳 简体中文', value: 'zh-CN' },
  { text: '🇺🇸 English', value: 'en-US' },
  // { text: '🇯🇵 日本語', value: 'ja' },
  // { text: '🇰🇷 한국어', value: 'ko' },
  // { text: '🇹🇭 ไทย', value: 'th' },
  // { text: '🇷🇺 Русский', value: 'ru' },
  // { text: '🇸🇦 العربية', value: 'ar' },
  // { text: '🇻🇳 Tiếng Việt', value: 'vi' },
  // { text: '🇫🇷 Français', value: 'fr' },
  // { text: '🇩🇪 Deutsch', value: 'de' },
  // { text: '🇲🇾 Bahasa Melayu', value: 'ms' },
  // { text: '🇮🇳 हिन्दी', value: 'hi' },
  // { text: '🇪🇸 Español', value: 'es' },
];

function getLocale() {
  const userLocale = SUPPORTED_LOCALES.find((locale) => locale.value.includes(navigator.language));

  return storage.get('locale') || userLocale?.value || DEFAULT_LANG;
}

function setupLocale() {
  const locale = getLocale();

  const i18n = createI18n({
    legacy: false,
    locale,
    fallbackLocale: DEFAULT_LANG,
    messages: {
      'zh-CN': { ...zhCN },
    },
  });

  setLocale(locale);

  return i18n;
}

export const i18n = setupLocale();

async function loadLocaleMessages(locale) {
  try {
    return await import(`./${locale}.ts`);
  } catch {
    return await import(`./${DEFAULT_LANG}.ts`);
  }
}

function setVantLocale(locale) {
  const vantLocales = {
    'zh-CN': require('vant/es/locale/lang/zh-CN').default,
    'en-US': require('vant/es/locale/lang/en-US').default,
  };

  Locale.use(locale, vantLocales[locale] || vantLocales['en-US']);
}

async function setLocale(locale) {
  const messages = await loadLocaleMessages(locale);

  document.querySelector('html').setAttribute('lang', locale);

  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale.value = locale;

  setVantLocale(locale);
}

export function changeLocale(locale) {
  setLocale(locale);

  storage.set('locale', locale);
}
