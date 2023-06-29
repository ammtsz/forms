declare global {
  type ConstantValues<T> = T[keyof T]
}

export {}
