export type ExtensibleDeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: ExtensibleDeepPartial<T[P]>
    } & { [key: string]: any }
  : T
