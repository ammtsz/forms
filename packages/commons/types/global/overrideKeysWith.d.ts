export type OverrideKeysWith<T, V> = {
  [P in keyof T]: V
}
