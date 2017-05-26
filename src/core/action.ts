export interface Action<T> {
  readonly description: string;

  perform(driver: T): Promise<void>;
}
