export function staticImplements<T>() {
  // tslint:disable-next-line: no-unused-expression
  return <U extends T>(constructor: U) => { constructor };
}