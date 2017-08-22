import {Action} from '@cybernaut/types/lib/Action';

export class MockAction<T> implements Action<T> {
  public readonly description: string;
  public readonly implementation: jest.Mock<Promise<T>> = jest.fn<Promise<T>>();

  public constructor(description: string) {
    this.description = description;
  }
}
