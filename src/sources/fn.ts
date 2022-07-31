// https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
type Ctx = Record<string | symbol, any>;
export const sandboxFn = (fn: string) => {
  const code = `with (sandbox) {${fn}}`;
  const func = new Function('sandbox', code);
  return (closure?: Ctx) => {
    const proxy = new Proxy<Ctx>(closure, { has, get });
    return func(proxy);
  };
};

function has(target: Ctx, key: string | symbol) {
  return true;
}

function get(target: Ctx, key: string | symbol) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}