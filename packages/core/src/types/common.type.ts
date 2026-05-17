export type IsTuple<T extends ReadonlyArray<any>> = number extends T["length"] ? false : true;
export type TupleKeys<T extends ReadonlyArray<any>> = Exclude<keyof T, keyof any[]>;
export type Primitive = null | undefined | string | number | boolean | symbol | bigint;
export type BrowserNativeObject = Date | FileList | File;
export type IsEqual<T1, T2> = T1 extends T2 ? ((<G>() => G extends T1 ? 1 : 2) extends <G>() => G extends T2 ? 1 : 2 ? true : false) : false;
export type AnyIsEqual<T1, T2> = T1 extends T2 ? (IsEqual<T1, T2> extends true ? true : never) : never;
export type IsAny<T> = 0 extends 1 & T ? true : false;
