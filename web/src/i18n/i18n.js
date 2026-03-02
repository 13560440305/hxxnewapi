/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from './locales/en.json';
import zhCNTranslation from './locales/zh-CN.json';
import zhTWTranslation from './locales/zh-TW.json';

/** 与后端一致，仅支持 3 种语言：简体中文、繁体中文、英文 */
export const SUPPORTED_LANGUAGES = [
  { value: 'zh-CN', label: '简体中文' },
  { value: 'zh-TW', label: '繁體中文' },
  { value: 'en', label: 'English' },
];

const SUPPORTED_LANG_CODES = ['zh-CN', 'zh-TW', 'en'];

export function isSupportedLanguage(lang) {
  return SUPPORTED_LANG_CODES.includes(lang);
}

export function normalizeLanguage(lang) {
  if (!lang) return 'zh-CN';
  if (lang === 'zh-TW') return 'zh-TW';
  if (lang === 'en') return 'en';
  if (String(lang).startsWith('zh')) return 'zh-CN';
  return 'zh-CN';
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    load: 'currentOnly',
    resources: {
      en: enTranslation,
      'zh-CN': zhCNTranslation,
      'zh-TW': zhTWTranslation,
    },
    fallbackLng: 'zh-CN',
    supportedLngs: SUPPORTED_LANG_CODES,
    nsSeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

// 初始化后确保当前语言一定是三者之一，避免检测到法/日/俄等时显示非支持语种
i18n.on('initialized', () => {
  const current = i18n.language;
  if (!isSupportedLanguage(current)) {
    const lang = normalizeLanguage(current);
    i18n.changeLanguage(lang);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('i18nextLng', lang);
    }
  }
});

export default i18n;
