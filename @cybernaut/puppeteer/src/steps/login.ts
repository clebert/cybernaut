import {TestStep} from '@cybernaut/test/lib/TestRunner';
import {TestContext} from '../TestContext';
import {typeIntoInputField} from '../page/typeIntoInputField';

export interface LoginParameters {
  readonly username: string;
  readonly usernameSelector: string;
  readonly password: string;
  readonly passwordSelector: string;
  readonly loginSelector: string;
}

export function login(parameters: LoginParameters): TestStep<TestContext> {
  const {
    username,
    usernameSelector,
    password,
    passwordSelector,
    loginSelector
  } = parameters;

  return async ({page}) => {
    await typeIntoInputField(page, usernameSelector, username);
    await typeIntoInputField(page, passwordSelector, password);

    await page.click(loginSelector);
  };
}
