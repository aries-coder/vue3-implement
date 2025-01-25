import { isObj } from "@vue/shared"
import { mutablehandlers, ReactiveFlags } from "./baseHandler"

// 缓存代理对象
const reactiveMap = new WeakMap()

export function reactive(target) {

  return createReactiveObject(target)
}

function createReactiveObject(target) {

  // 判断是否是对象，如果不是直接返回
  if (!isObj(target)) return target

  // 判断对象是否是个代理对象，如果是则直接返回
  if (target[ReactiveFlags.IS_REACTIVE]) return target

  // 判断是否已经被代理过，如果已被代理则直接返回
  if (reactiveMap.get(target)) return reactiveMap.get(target)

  const proxy = new Proxy(target, mutablehandlers)

  reactiveMap.set(target, proxy)

  return proxy
}