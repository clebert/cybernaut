import {Condition} from '@cybernaut/types/lib/Condition';

export class MockCondition<T> implements Condition<T> {
  public readonly description: string;
  public readonly accessor: jest.Mock<T> = jest.fn<T>();
  public readonly predicate: jest.Mock<T> = jest.fn<T>();
  public readonly negated: boolean;

  public constructor(description: string, negated: boolean) {
    this.description = description;
    this.negated = negated;
  }
}
