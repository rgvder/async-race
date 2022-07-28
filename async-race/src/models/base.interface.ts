export type BaseObject = Partial<Record<string, string | number | boolean | number[]>>;

export interface Page<T> {
  total: number;
  items: T[];
}
