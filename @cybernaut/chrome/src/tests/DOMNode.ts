import {Engine} from '@cybernaut/engine/lib/Engine';
import * as express from 'express';
import {Server} from 'http';
import {join} from 'path';
import {getPortPromise} from 'portfinder';
import {Chrome} from '../Chrome';
import {DOMNode} from '../DOMNode';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const {assert, perform} = new Engine(1, 100);

const app = express();

app.use(express.static(join(__dirname, 'fixtures/DOMNode/')));

let chrome: Chrome;
let port: number;
let server: Server;

function createUrl(name: string): string {
  return `http://localhost:${port}/${name}.html`;
}

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

describe('rootNode', () => {
  let node: DOMNode;

  beforeEach(() => {
    node = chrome.rootNode;
  });

  describe('DOMNode.html', () => {
    it('should describe itself correctly', () => {
      const condition = node.html.is.equalTo('html');

      expect(condition.description).toBe(
        "Chrome.launch().rootNode.html.is.equalTo('html')"
      );
    });

    it('should return the html', async () => {
      await perform(chrome.navigateTo(createUrl('html')));

      await assert(node.html.is.containing('<span>level-0</span>'));
      await assert(node.html.is.containing('<span>level-1</span>'));
      await assert(node.html.is.containing('<span>level-2-0</span>'));
      await assert(node.html.is.containing('<span>level-2-1</span>'));
    });
  });
});

describe("rootNode.descendantNode('div')", () => {
  let node: DOMNode;

  beforeEach(() => {
    node = chrome.rootNode.descendantNode('div');
  });

  describe('DOMNode.html', () => {
    it('should describe itself correctly', () => {
      const condition = node.html.is.equalTo('html');

      expect(condition.description).toBe(
        "Chrome.launch().rootNode.descendantNode('div').html.is.equalTo('html')"
      );
    });

    it('should return the html', async () => {
      await perform(chrome.navigateTo(createUrl('html')));

      await assert(node.html.is.containing('<span>level-1</span>'));
      await assert(node.html.is.containing('<span>level-2-0</span>'));
      await assert(node.html.is.containing('<span>level-2-1</span>'));

      await assert(node.html.isNot.containing('<span>level-0</span>'));
    });
  });
});

describe("rootNode.descendantNode('div').descendantNode('div', 1)", () => {
  let node: DOMNode;

  beforeEach(() => {
    node = chrome.rootNode.descendantNode('div').descendantNode('div', 1);
  });

  describe('DOMNode.html', () => {
    it('should describe itself correctly', () => {
      const condition = node.html.is.equalTo('html');

      expect(condition.description).toBe(
        "Chrome.launch().rootNode.descendantNode('div').descendantNode('div', 1).html.is.equalTo('html')"
      );
    });

    it('should return the html', async () => {
      await perform(chrome.navigateTo(createUrl('html')));

      await assert(node.html.is.containing('<span>level-2-1</span>'));

      await assert(node.html.isNot.containing('<span>level-0</span>'));
      await assert(node.html.isNot.containing('<span>level-1</span>'));
      await assert(node.html.isNot.containing('<span>level-2-0</span>'));
    });
  });
});

describe("rootNode.descendantNode('unknown')", () => {
  let node: DOMNode;

  beforeEach(() => {
    node = chrome.rootNode.descendantNode('unknown');
  });

  describe('DOMNode.html', () => {
    it('should throw an error', async () => {
      await perform(chrome.navigateTo(createUrl('html')));

      await expect(assert(node.html.is.equalTo('html'))).rejects.toEqual(
        new Error(
          "Assert: Chrome.launch().rootNode.descendantNode('unknown').html.is.equalTo('html') => Error: No node found"
        )
      );
    });
  });
});
