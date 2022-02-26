/**
 * time: lookup -> O(n), insertion, deletion -> O(1)
 * space: O(n)
 */

class LinkedListNode {
  value!: any;
  next!: LinkedListNode | null;

  constructor(value: any) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  private _head!: LinkedListNode | null;
  private _tail!: LinkedListNode | null;
  private _length!: number;

  constructor() {
    this._head = this._tail = null;
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  public get(index: number): any {
    const node = this.find(index);
    if (!node) {
      return null;
    }
    return node.value;
  }

  public push(value: any): void {
    const node = new LinkedListNode(value);
    this._length++;
    if (!this._head) {
      this._head = node;
    } else if (this._tail) {
      this._tail.next = node;
    }
    this._tail = node;
  }

  public pop(): any {
    return this.delete(this._length - 1);
  }

  public delete(index: number): any {
    if (index === 0) {
      const head = this._head;
      if (!head) {
        return null;
      }
      if (this._head === this._tail) {
        this._head = this._tail = null;
      } else {
        this._head = head.next;
      }
      this._length--;
      return head.value;
    }
    const previousNode = this.find(index - 1);
    const nodeToDelete = previousNode?.next;
    if (!nodeToDelete) {
      return null;
    }
    previousNode.next = nodeToDelete.next;
    if (!previousNode.next) {
      this._tail = previousNode;
    }
    this._length--;
    return nodeToDelete.value;
  }

  private find(index: number): LinkedListNode | null {
    if (index >= this._length) {
      return null;
    }
    let current = this._head;
    for (let i = 0; i <= index - 1; i++) {
      if (current) {
        current = current.next;
      } else {
        break;
      }
    }
    return current;
  }
}

describe('linked list', function () {
  it('length, get, push, pop, delete', function () {
    const linkedList = new LinkedList();

    expect(linkedList.length).toEqual(0);
    expect(linkedList.get(0)).toBeNull();

    linkedList.push(1);
    expect(linkedList.get(0)).toEqual(1);
    linkedList.push(3);
    expect(linkedList.get(1)).toEqual(3);
    linkedList.push(7);
    expect(linkedList.get(2)).toEqual(7);
    linkedList.push(3);
    expect(linkedList.get(3)).toEqual(3);
    expect(linkedList.length).toEqual(4);

    expect(linkedList.pop()).toEqual(3);
    expect(linkedList.length).toEqual(3);
    expect(linkedList.get(0)).toEqual(1);
    expect(linkedList.get(1)).toEqual(3);
    expect(linkedList.get(2)).toEqual(7);
    expect(linkedList.get(3)).toBeNull();

    expect(linkedList.delete(1)).toEqual(3);
    expect(linkedList.length).toEqual(2);
    expect(linkedList.get(0)).toEqual(1);
    expect(linkedList.get(1)).toEqual(7);
    expect(linkedList.get(2)).toBeNull();

    linkedList.push(1);
    expect(linkedList.get(2)).toEqual(1);
    expect(linkedList.length).toEqual(3);

    expect(linkedList.pop()).toEqual(1);
    expect(linkedList.length).toEqual(2);

    expect(linkedList.get(0)).toEqual(1);
    expect(linkedList.get(1)).toEqual(7);
    expect(linkedList.get(2)).toBeNull();

    linkedList.pop();
    expect(linkedList.length).toEqual(1);
    linkedList.pop();
    expect(linkedList.length).toEqual(0);
    linkedList.pop();
    expect(linkedList.length).toEqual(0);

    linkedList.push(1);
    linkedList.push(7);

    expect(linkedList.delete(0)).toEqual(1);
    expect(linkedList.get(0)).toEqual(7);
    expect(linkedList.length).toEqual(1);

    expect(linkedList.delete(0)).toEqual(7);
    expect(linkedList.length).toEqual(0);

    expect(linkedList.delete(0)).toBeNull();
    expect(linkedList.length).toEqual(0);
  });
});
