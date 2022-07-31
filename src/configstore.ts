import { writable } from 'svelte/store';

export enum NextLinkType {
  DEFAULT,
  REGEXP,
  FUNCTION,
}

export const defaultConfig = {
  useTiny: true,
  nextLink: NextLinkType.DEFAULT,
  nextLinkRegex: `href="([^"]+)"[^>]*>\\s*Next`,
  nextLinkFn: `return "https://www.reddit.com/r/HFY/comments/f94rak/oc_pthok_eats_an_ice_cream_cone/"`,
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
    const nconf = JSON.parse(localStorage.getItem('config'));
    config.set(toValidConfig(nconf));
  } catch { }
};