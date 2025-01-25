import { track } from "./reactiveEffect"

export enum ReactiveFlags {
  IS_REACTIVE = '__v_isReactive'
}
// 代理对象 handler
export const mutablehandlers: ProxyHandler<any> = {
  get(target, key, receiver) {
    if (key === ReactiveFlags.IS_REACTIVE) return true

    track(target, key)

    return Reflect.get(target, key, receiver)
  },
  set(target, key, value, receiver) {

    Reflect.set(target, key, value, receiver)

    return true;
  }
}