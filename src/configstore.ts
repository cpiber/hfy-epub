import { writable } from 'svelte/store';

const defaultConfig = {
  useTiny: true,
};
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
  } catch {}
};