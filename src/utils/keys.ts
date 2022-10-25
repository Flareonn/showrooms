import type { AxiosInstance } from "axios";
import { inject, InjectionKey } from "vue";

export const AxiosKey: InjectionKey<AxiosInstance> = Symbol("axios");

export function injectStrict<T>(key: InjectionKey<T>) {
  const resolved = inject(key);
  if (!resolved) {
    throw new Error(`Could now resolve ${key.description}`);
  }
  return resolved;
}
