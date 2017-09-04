/// <reference path="../types/chrome-remote-interface.d.ts" />

import {Property} from '@cybernaut/core/lib/Property';
import {getRecording} from '@cybernaut/utils/lib/getRecording';
import {recordable} from '@cybernaut/utils/lib/recordable';

export interface DOMNodeLocator {
  readonly parentNode: DOMNode;
  readonly selector: string;
  readonly index: number;
}

export class DOMNode {
  public readonly locator?: DOMNodeLocator;

  private readonly client: CDP.Client;

  public constructor(
    description: string,
    client: CDP.Client,
    locator?: DOMNodeLocator
  ) {
    this.client = client;
    this.locator = locator;

    return recordable<DOMNode>(description, ['client'])(this);
  }

  public get html(): Property {
    return new Property(getRecording(this), async () => {
      const nodeId = await this.findNodeId(this);

      return (await this.client.DOM.getOuterHTML({nodeId})).outerHTML;
    });
  }

  public descendantNode(selector: string, index: number = 0): DOMNode {
    return new DOMNode(getRecording(this), this.client, {
      parentNode: this,
      selector,
      index
    });
  }

  private async findNodeId(
    {locator: currentLocator}: DOMNode,
    locators: DOMNodeLocator[] = []
  ): Promise<CDP.DOM.NodeId> {
    if (currentLocator) {
      return this.findNodeId(currentLocator.parentNode, [
        currentLocator,
        ...locators
      ]);
    }

    const {DOM} = this.client;
    const {root} = await DOM.getDocument();

    let currentNodeId: CDP.DOM.NodeId = root.nodeId;

    for (const locator of locators) {
      const {nodeIds} = await DOM.querySelectorAll({
        nodeId: currentNodeId,
        selector: locator.selector
      });

      const nodeId = nodeIds[locator.index] as number | undefined;

      if (nodeId === undefined) {
        throw new Error('No node found');
      }

      currentNodeId = nodeId;
    }

    return currentNodeId;
  }
}
