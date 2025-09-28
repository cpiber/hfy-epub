/* eslint-disable camelcase */
declare global {
  const __VERSION__: string;
}

const manifest: browser._manifest.WebExtensionManifest = {
  manifest_version: 2,
  name: '__MSG_title__',
  description: '__MSG_extensionDescription__',
  version: __VERSION__,
  icons: {
    128: 'icons/icon_128.png',
    64: 'icons/icon_64.png',
  },
  content_scripts: [
    {
      matches: [
        '*://cpiber.github.io/hfy-epub/*',
        '*://localhost:8080/*',
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
  permissions: [
    'storage',
  ],
  optional_permissions: [
    '*://*/*',
  ],
  browser_action: {
    default_icon: {
      128: 'icons/icon_128.png',
      64: 'icons/icon_64.png',
    },
    default_title: '__MSG_title__',
  },
  browser_specific_settings: {
    gecko: {
      id: 'hfy-epub-ext@piber.at',
    },
  },
  default_locale: 'en',
};
export default manifest;