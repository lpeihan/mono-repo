import enUS_antd from 'ant-design-vue/es/locale/en_US';
import zhCN_antd from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import { createI18n } from 'vue-i18n';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

import { storage } from '../utils';

import zhCN from './zh-CN';

enum Locale {
  zhCN = 'zh-CN',
  enUS = 'en-US',
}

const DEFAULT_LANG = Locale.zhCN;

// https://github.com/lokalise/i18n-ally/tree/main/locales
export const SUPPORTED_LOCALES = [
  { name: '🇨🇳 简体中文', value: Locale.zhCN },
  { name: '🇺🇸 English', value: Locale.enUS },
  // { name: '🇨🇳 繁體中文', value: 'zh-TW' },
  // { name: '🇯🇵 日本語', value: 'ja' },
  // { name: '🇰🇷 한국어', value: 'ko' },
  // { name: '🇹🇭 ไทย', value: 'th' },
  // { name: '🇷🇺 Русский', value: 'ru' },
  // { name: '🇸🇦 العربية', value: 'ar' },
  // { name: '🇻🇳 Tiếng Việt', value: 'vi' },
  // { name: '🇫🇷 Français', value: 'fr' },
  // { name: '🇩🇪 Deutsch', value: 'de' },
  // { name: '🇲🇾 Bahasa Melayu', value: 'ms' },
  // { name: '🇮🇳 हिन्दी', value: 'hi' },
  // { name: '🇪🇸 Español', value: 'es' },
];

function getLocale() {
  const userLocale = SUPPORTED_LOCALES.find((locale) => locale.value.includes(navigator.language));

  return storage.get('locale') || userLocale?.value || DEFAULT_LANG;
}
export function getAntdLocale() {
  const locale = getLocale();

  const antdLocales = {
    [Locale.zhCN]: zhCN_antd,
    [Locale.enUS]: enUS_antd,
  };

  return antdLocales[locale];
}

function getDayjsLocale(locale) {
  const dayjsLocales = {
    [Locale.zhCN]: 'zh-cn',
    [Locale.enUS]: 'en',
  };

  return dayjsLocales[locale];
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

async function setLocale(locale) {
  const messages = await loadLocaleMessages(locale);

  document.querySelector('html').setAttribute('lang', locale);

  i18n.global.setLocaleMessage(locale, messages.default);
  i18n.global.locale.value = locale;
  dayjs.locale(getDayjsLocale(locale));
}

export function changeLocale(locale) {
  setLocale(locale);

  storage.set('locale', locale);
}
