// import {Engine} from '@cybernaut/engine/lib/Engine';
import * as express from 'express';
import {Server} from 'http';
import {join} from 'path';
import {getPortPromise} from 'portfinder';
import {Chrome} from '../Chrome';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

// const {assert, perform, retryDelay} = new Engine(1, 100);

const app = express();

app.use(express.static(join(__dirname, 'fixtures/DOMNode/')));

let chrome: Chrome;
let port: number;
let server: Server;

/*
function createUrl(name: string): string {
  return `http://localhost:${port}/${name}.html`;
}
*/

beforeEach(async () => {
  chrome = await Chrome.launch();
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

describe('DOMNode.html()', () => {
  it('should describe itself correctly', () => {
    // TODO
  });
});
