import {createTestRunner} from '@cybernaut/test/lib/TestRunner';
import {createTestSetup, createTestTeardown} from '../TestContext';

const run = createTestRunner(createTestSetup(), createTestTeardown());

test(
  'Navigating to https://example.com and asserting the page title',
  run(({page}) => [
    async () => page.goto('https://example.com'),
    async () => expect(page.title()).resolves.toBe('Example Domain')
  ])
);
