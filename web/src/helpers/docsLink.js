/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

/** 解析后台配置的文档地址：站内路径走 SPA/静态文档，外链新窗口打开 */
export function resolveDocsLink(docsLink) {
  const link = (docsLink || '/docs/').trim();
  if (/^https?:\/\//i.test(link)) {
    return { isExternal: true, href: link };
  }
  const href = link.startsWith('/') ? link : `/${link}`;
  return { isExternal: false, href, fullPage: href === '/docs' || href.startsWith('/docs/') };
}

export function openDocsLink(docsLink) {
  const { isExternal, href } = resolveDocsLink(docsLink);
  if (isExternal) {
    window.open(href, '_blank', 'noopener,noreferrer');
  } else {
    window.location.href = href;
  }
}
