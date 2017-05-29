export interface Accessor<T, S> {
  readonly description: string;

  get(driver: T): Promise<S>;
}
