import {WebDriver} from 'selenium-webdriver';
import {sleep} from '../utils/sleep';
import {Accessor} from './accessor';
import {Predicate} from './predicate';

export interface Options {
  readonly retries: number;
  readonly retryDelay: number;
}

export type VerificationResult = 'error' | 'invalid' | 'valid';

export interface Verification {
  readonly description: string;
  readonly result: VerificationResult;
}

export type Verifier = (
  driver: WebDriver, attempt: number, retries: number
) => Promise<Verification>;

export function createVerifier<T>(
  accessor: Accessor<T>, predicate: Predicate<T>
): Verifier {
  const description = `${accessor.description} ${predicate.description}`;

  return async (driver: WebDriver, attempt: number, retries: number) => {
    try {
      const actualValue = await accessor.get(driver);
      const result = predicate.test(actualValue);

      if (!result) {
        return {
          description: `${description} (${predicate.compare(actualValue)})`,
          result: 'invalid'
        };
      }

      const attempts = ` (attempt ${attempt} of ${retries + 1})`;

      return {
        description: description + (attempt > 1 ? attempts : ''),
        result: 'valid'
      };
    } catch (e) {
      const message = e && e.message ? String(e.message) : 'unknown error';

      return {description: `${description} (${message})`, result: 'error'};
    }
  };
}

export async function verify(
  verifier: Verifier, driver: WebDriver, options: Options, _attempt: number = 1
): Promise<Verification> {
  const {retries, retryDelay} = options;

  const verification = await verifier(driver, _attempt, retries);

  if (verification.result === 'valid' || retries < _attempt) {
    return verification;
  }

  await sleep(retryDelay);

  return verify(verifier, driver, options, _attempt + 1);
}
