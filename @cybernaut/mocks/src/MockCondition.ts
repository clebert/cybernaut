import {Condition} from '@cybernaut/types/lib/Condition';

export class MockCondition implements Condition {
  public readonly description: string;

  /* tslint:disable no-any */
  public readonly accessor: jest.Mock<any> = jest.fn();
  public readonly predicate: jest.Mock<any> = jest.fn();
  /* tslint:enable no-any */

  public readonly negated: boolean;

  public constructor(description: string, negated: boolean) {
    this.description = description;
    this.negated = negated;
  }
}
