import { writable } from 'svelte/store';

export enum NextLinkType {
  DEFAULT,
  REGEXP,
  FUNCTION,
};
export enum ChapterTransformType {
  NONE,
  REGEXP,
  SELECTOR,
  FUNCTION,
};

export const defaultConfig = {
  useTiny: false,
  nextLink: NextLinkType.DEFAULT,
  nextLinkRegex: `href="([^"]+)"[^>]*>\\s*Next`,
  nextLinkFn: `return "https://www.reddit.com/r/HFY/comments/f94rak/oc_pthok_eats_an_ice_cream_cone/" // use \`document\` or \`html\` to extract`,
  transform: ChapterTransformType.NONE,
  transformRegex: '.md',
  transformSelector: '',
  transformFn: `title = "P'Thok Eats an Ice Cream Cone" // or read from \`title\`
html = "https://www.reddit.com/r/HFY/comments/f94rak/oc_pthok_eats_an_ice_cream_cone/" // use \`document\`, \`html\`, \`url\``,
};
export type Config = typeof defaultConfig;
export const config = writable(defaultConfig);
export const toValidConfig = (nconf?: any) => {
  if (!nconf || '' + nconf !== "[object Object]") return defaultConfig;
  const nk = Object.keys(nconf), dk = Object.keys(defaultConfig) as Array<keyof typeof defaultConfig>;
  for (const k of dk) {
    if (!nk.includes(k)) nconf[k] = defaultConfig[k];
    if (typeof defaultConfig[k] !== typeof nconf[k]) nconf[k] = defaultConfig[k];
  }
  return nconf;
};
export const loadConfig = () => {
  try {
    const nconf = JSON.parse(localStorage.getItem('config') ?? '');
    config.set(toValidConfig(nconf));
  } catch { }
};