import {WebDriver} from 'selenium-webdriver';
import {Accessor} from './accessor';
import {Config} from './config';
import {Predicate} from './predicate';
import {sleep} from './utils';

export type Options = Pick<Config, 'retries' | 'retryDelay'>;
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
  const description = `${accessor.name} ${predicate.description}`;

  return async (driver: WebDriver, attempt: number, retries: number) => {
    try {
      const actualValue = await accessor.get(driver);
      const result = await predicate.test(actualValue);

      if (result === false) {
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
