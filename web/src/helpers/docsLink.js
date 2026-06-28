/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import { normalizeLanguage } from '../i18n/i18n';

/** 文档支持的语言目录：英文独立目录，其余语言使用中文文档 */
export function resolveDocsLanguagePath() {
  let lang = 'zh-CN';
  try {
    lang = normalizeLanguage(localStorage.getItem('i18nextLng'));
  } catch {
    // ignore
  }
  return lang === 'en' ? '/docs/en/' : '/docs/cn/';
}

/** 解析后台配置的文档地址：站内路径按用户语言跳转 cn/en，外链新窗口打开 */
export function resolveDocsLink(docsLink) {
  const raw = (docsLink || '/docs/').trim();
  if (/^https?:\/\//i.test(raw)) {
    return { isExternal: true, href: raw };
  }
  let href = raw.startsWith('/') ? raw : `/${raw}`;
  if (href === '/docs' || href === '/docs/') {
    href = resolveDocsLanguagePath();
  }
  return {
    isExternal: false,
    href,
    fullPage: href === '/docs' || href.startsWith('/docs/'),
  };
}

export function openDocsLink(docsLink) {
  const { isExternal, href } = resolveDocsLink(docsLink);
  if (isExternal) {
    window.open(href, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = href;
  }
}
