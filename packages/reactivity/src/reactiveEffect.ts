import { activeEffect } from "./effect";

export function track(target, key) {
  
  if (!activeEffect) return
  
  console.log(activeEffect, key);
  
}