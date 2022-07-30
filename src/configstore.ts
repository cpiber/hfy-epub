import { writable } from 'svelte/store';

export enum NextLinkType {
  DEFAULT,
  REGEXP,
  FUNCTION,
}

const defaultConfig = {
  useTiny: true,
  nextLink: NextLinkType.DEFAULT,
  nextLinkRegex: `href="([^"]+)"[^>]*>\s*Next`,
  nextLinkFn: '',
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