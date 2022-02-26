/**
 * time: O(log n)
 * space: O(n)
 */

class BinarySearchTreeNode {
  public value!: any;
  public left!: BinarySearchTreeNode | null;
  public right!: BinarySearchTreeNode | null;

  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
  }

  public serialize(): any {
    const res: any = { value: this.value };
    res.left = this.left === null ? null : this.left.serialize();
    res.right = this.right === null ? null : this.right.serialize();
    return res;
  }
}

class BinarySearchTree {
  private _root!: BinarySearchTreeNode | null;

  constructor() {
    this._root = null;
  }

  public add(value: any): BinarySearchTree {
    if (this._root === null) {
      this._root = new BinarySearchTreeNode(value);
    } else {
      let current = this._root;
      while (true) {
        if (current.value > value) {
          if (current.left) {
            current = current.left;
          } else {
            current.left = new BinarySearchTreeNode(value);
            break;
          }
        } else {
          if (current.right) {
            current = current.right;
          } else {
            current.right = new BinarySearchTreeNode(value);
            break;
          }
        }
      }
    }
    return this;
  }

  public toObject(): any {
    if (!this._root) {
      return null;
    }
    return this._root.serialize();
  }

  public toJSON(): string {
    if (!this._root) {
      return '';
    }
    return JSON.stringify(this._root.serialize(), null, 4);
  }
}

describe('binary search tree', function () {
  it('works correctly', function () {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new BinarySearchTree();
    nums.forEach((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(3);

    expect(objs.left.value).toEqual(1);
    expect(objs.left.left).toBeNull();

    expect(objs.left.right.value).toEqual(2);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(4);
    expect(objs.right.left.left).toBeNull();

    expect(objs.right.left.right.value).toEqual(6);
    expect(objs.right.left.right.left.value).toEqual(5);
    expect(objs.right.left.right.left.right).toBeNull();
    expect(objs.right.left.right.left.left).toBeNull();

    expect(objs.right.right.value).toEqual(10);
    expect(objs.right.right.right).toBeNull();

    expect(objs.right.right.left.value).toEqual(9);
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.left.left.value).toEqual(8);
    expect(objs.right.right.left.left.right).toBeNull();
    expect(objs.right.right.left.left.left).toBeNull();
  });
});
