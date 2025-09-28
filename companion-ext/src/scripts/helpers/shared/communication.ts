import { Event, Message } from './constants';
import { clone, parseTypeObject } from './helpers';

export function sendMessage(name: Message.GET_MESSAGE, data: { message: string; }): Promise<string>;
export function sendMessage<T>(name: Exclude<Message, Message.GET_MESSAGE>, data?: { [key: string]: any; }, expectAnswer?: boolean, skipOriginCheck?: boolean): Promise<T>;
export function sendMessage<T>(name: Message, data?: { [key: string]: any; }, expectAnswer = true) {
  console.dev.debug('Sending message', name, 'with data', data);
  if (!expectAnswer) {
    window.parent.postMessage(JSON.stringify({ ...data, type: name }), '*');
    return Promise.resolve(undefined as T);
  }
  return new Promise<T>((resolve, reject) => {
    const e = `companion-message-${Math.random().toString().substring(2)}`;
    const c = (ev: MessageEvent) => {
      try {
        const msg = parseTypeObject<{ type: string, err?: any, res?: any; }>(ev.data);
        if (msg.type !== e) return;
        window.removeEventListener('message', c);
        if (msg.err !== undefined)
          reject(msg.err);
        else
          resolve(msg.res);
      } catch { }
    };
    window.addEventListener('message', c);
    window.parent.postMessage(JSON.stringify({ ...data, type: name, name: e }), '*');
  });
}

export type Listener<R = any, E = any> = (res: R, err: E) => void;
export function sendEventHandler(event: Event, listener: Listener) {
  console.dev.debug('Registering remote listener for', event);
  const e = `companion-event-${event}-${Math.random().toString().substring(2)}`;
  const c = (ev: MessageEvent) => {
    try {
      const msg = parseTypeObject<{ type: string, err?: any, res?: any; }>(ev.data);
      if (msg.type !== e) return;
      listener(msg.res, msg.err);
    } catch { }
  };
  window.addEventListener('message', c);
  window.parent.postMessage(JSON.stringify({ type: Message.REGISTER_LISTENER, name: e, event }), '*');
}

export const replyMessage = (e: MessageEvent, name: string, data?: any, err?: any) => {
  if (!name) return;
  console.dev.debug('Replying to', name, 'with data', data, 'and error', err);
  e.source.postMessage(
    clone({ type: name, res: data, err }),
    // @ts-expect-error Why??
    e.origin,
  );
};