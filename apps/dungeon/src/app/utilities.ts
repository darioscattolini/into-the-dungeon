  // not tested: just to enforce typings before runtime
export function staticImplements<T>() {
  return <U extends T>(constructor: U) => constructor;
}
