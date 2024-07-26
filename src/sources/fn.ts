// https://blog.risingstack.com/writing-a-javascript-framework-sandboxed-code-evaluation/
type Ctx = Record<string | symbol, any>;
export const sandboxFn = (fn: string) => {
  const code = `with (sandbox) {${fn}\n}`;
  const func = new Function('sandbox', code);
  const ctx = Object.create(null);
  ctx['console'] = { log: console.log, table: console.table, error: console.error, assert: console.assert };
  const proxy = new Proxy<Ctx>(ctx, { has, get });
  return (closure?: Parameters<typeof Object.defineProperties>[1]) => {
    Object.defineProperties(proxy, closure);
    return { proxy, ret: func(proxy) };
  };
};

function has(target: Ctx, key: string | symbol) {
  return true;
}

function get(target: Ctx, key: string | symbol) {
  if (key === Symbol.unscopables) return undefined;
  return target[key];
}