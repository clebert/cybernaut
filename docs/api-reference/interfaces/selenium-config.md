# `SeleniumConfig`

## Type definition

```ts
interface Options {
  readonly retries: number;
  readonly retryDelay: number;
}

interface Capabilities {
  readonly browserName: string;
}

interface Timeouts {
  readonly element: number;
  readonly page: number;
  readonly script: number;
}

interface SeleniumConfig extends Options {
  readonly capabilities: Capabilities;
  readonly timeouts: Timeouts;
}
```
