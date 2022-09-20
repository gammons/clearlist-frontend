export interface Storeable {
  load(key: string): any
  save(key: string, value: any): void
  unset(key: string): void
  clear(): void
}
