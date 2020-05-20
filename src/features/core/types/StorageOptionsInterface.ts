export interface StorageOptionsInterface<T> {
  encode: (value: T) => string;
  decode: (value: string) => T;
}
