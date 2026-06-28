(function (global) {
  var DOC_LOCALES = {
    'zh-CN': {
      backHome: '返回产品首页',
      searchPlaceholder: '输入关键词搜索',
      searchNoData: '没有找到结果',
      loading: '加载中…',
      langSwitch: 'EN',
      otherLangPath: '/docs/en/',
      otherLangLabel: 'English',
    },
    en: {
      backHome: 'Back to home',
      searchPlaceholder: 'Type to search',
      searchNoData: 'No results found',
      loading: 'Loading…',
      langSwitch: '中文',
      otherLangPath: '/docs/cn/',
      otherLangLabel: '中文',
    },
  };

  var PUBLIC_DOC_PATHS = {
    'zh-CN': [
      '产品介绍.md',
      '快速开始.md',
      '本地开发与启动.md',
      'API导航.md',
      '音频.md',
      '聊天.md',
      '补全.md',
      '图像.md',
      '模型.md',
      '审查.md',
      '实时语音.md',
      '重排序.md',
      '视频.md',
      '服务条款.md',
      '隐私政策.md',
    ],
    en: [
      'product-introduction.md',
      'quick-start.md',
      'local-development.md',
      'api-overview.md',
      'audio.md',
      'chat.md',
      'completions.md',
      'images.md',
      'models.md',
      'moderation.md',
      'realtime.md',
      'rerank.md',
      'video.md',
      'terms-of-service.md',
      'privacy-policy.md',
    ],
  };

  function boot(lang) {
    var localeKey = lang === 'en' ? 'en' : 'zh-CN';
    var locale = DOC_LOCALES[localeKey];
    var basePath = '/docs/' + (lang === 'en' ? 'en' : 'cn') + '/';
    var homepage =
      lang === 'en' ? 'product-introduction.md' : '产品介绍.md';

    var appEl = document.getElementById('app');
    if (appEl) appEl.textContent = locale.loading;

    var topBar = document.getElementById('docs-top-bar');
    if (topBar) {
      topBar.innerHTML =
        '<a class="docs-back-link" href="/"><span aria-hidden="true">←</span> ' +
        locale.backHome +
        '</a>' +
        '<a class="docs-lang-link" href="' +
        locale.otherLangPath +
        '">' +
        locale.langSwitch +
        '</a>';
    }

    document.documentElement.lang = localeKey;

    global.$docsify = {
      name: '',
      basePath: basePath,
      routerMode: 'hash',
      loadSidebar: 'sidebar.md',
      subMaxLevel: 2,
      sidebarDisplayLevel: 0,
      auto2top: true,
      homepage: homepage,
      search: {
        paths: PUBLIC_DOC_PATHS[localeKey],
        placeholder: locale.searchPlaceholder,
        noData: locale.searchNoData,
        depth: 6,
        hideOtherSidebarContent: false,
      },
      formatUpdated: '{YYYY}-{MM}-{DD} {HH}:{mm}',
      copyCode: true,
    };
  }

  global.bootDocsify = boot;
})(window);
