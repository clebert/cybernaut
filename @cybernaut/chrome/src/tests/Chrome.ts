import {Engine} from '@cybernaut/engine/lib/Engine';
import * as express from 'express';
import {Server} from 'http';
import {join} from 'path';
import {getPortPromise} from 'portfinder';
import {Chrome} from '../Chrome';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine();

const app = express();

app.use(express.static(join(__dirname, 'fixtures')));

let chrome: Chrome;
let port: number;
let server: Server;

function createUrl(name: string = ''): string {
  return `http://localhost:${port}/${name}`;
}

beforeEach(async () => {
  chrome = await Chrome.launchHeadless();
  port = await getPortPromise();
  server = app.listen(port);
});

afterEach(async () => {
  try {
    await chrome.quit();
  } finally {
    server.close();
  }
});

test('navigate to test page', async () => {
  await perform(chrome.navigateTo(createUrl()));

  await assert(chrome.pageTitle.is.containing('Test'));

  const writeToFile = process.env.CI !== 'true';

  console.info(await perform(chrome.captureScreenshot(writeToFile)));
});
