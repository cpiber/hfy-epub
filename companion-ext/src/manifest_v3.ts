/* eslint-disable camelcase */

const manifest: browser._manifest.WebExtensionManifest = {
  manifest_version: 3,
  name: '__MSG_title__',
  description: '__MSG_extensionDescription__',
  version: __VERSION__,
  icons: {
    128: 'icons/icon_128.png',
    64: 'icons/icon_64.png',
  },
  background: {
    service_worker: 'scripts/background_script.js',
  },
  content_scripts: [
    {
      matches: [
        '*://cpiber.github.io/hfy-epub/*',
        ...(__DEV__ ? ['*://localhost/*'] : []),
      ],
      js: [
        'scripts/content_script.js',
      ],
      css: [
        'styles/content.css',
      ],
      all_frames: true,
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'scripts/page_script.js',
        'styles/modal.css',
      ],
      matches: [
        '*://cpiber.github.io/*',
        ...(__DEV__ ? ['*://localhost/*'] : []),
      ],
    },
  ],
  permissions: [
    'storage',
    'scripting',
  ],
  host_permissions: [
    '<all_urls>',
  ],
  action: {
    default_icon: {
      128: 'icons/icon_128.png',
      64: 'icons/icon_64.png',
    },
    default_title: '__MSG_title__',
    default_popup: 'options.html',
  },
  options_ui: {
    page: 'options.html#standalone',
    browser_style: true,
  },
  browser_specific_settings: {
    gecko: {
      id: 'hfy-epub-ext@piber.at',
    },
  },
  default_locale: 'en',
};
export default manifest;