// https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
export const sandboxFn = (fn: string) => {
  const code = `with (sandbox) {${fn}}`;
  const func = new Function('sandbox', code);
  return (closure?: Record<string | symbol, any>) => {
    const proxy = new Proxy<Record<string | symbol, any>>(closure, { has, get });
    return func(proxy);
  };
};

function has(target: Record<string | symbol, any>, key: string | symbol) {
  return true;
}

function get(target: Record<string | symbol, any>, key: string | symbol) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}