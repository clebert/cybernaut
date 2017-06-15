# `SeleniumTestContext`

## Type definition

```ts
interface Options {
  readonly retries?: number;
  readonly retryDelay?: number;
}

interface SeleniumTestContext {
  assert<T>(accessor: SeleniumAccessor<T>, predicate: Predicate<S>, options?: Options): Promise<void>;
  perform(action: SeleniumAction<T>, options?: Options): Promise<void>;
  verify<T>(accessor: SeleniumAccessor<T>, predicate: Predicate<S>, options?: Options): Promise<boolean>;
}
```
