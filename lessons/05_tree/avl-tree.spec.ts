/**
 * time: O(log n)
 * space: O(n)
 */

class AVLTreeNode {
  public value!: any;
  public left!: AVLTreeNode | null;
  public right!: AVLTreeNode | null;
  public height!: number;

  constructor(value: any) {
    this.value = value;
    this.left = null;
    this.right = null;
    this.height = 1;
  }

  public add(value: any): void {
    if (value < this.value) {
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new AVLTreeNode(value);
      }
      if (!this.right || this.right?.height < this.left.height) {
        this.height = this.left.height + 1;
      }
    } else {
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new AVLTreeNode(value);
      }
      if (!this.left || this.left?.height < this.right.height) {
        this.height = this.right.height + 1;
      }
    }
    this.balance();
  }

  public serialize(): any {
    const res: any = { value: this.value };
    res.left = this.left === null ? null : this.left.serialize();
    res.right = this.right === null ? null : this.right.serialize();
    res.height = this.height;
    return res;
  }

  private balance(): void {
    const rightHeight = this.right?.height ?? 0;
    const leftHeight = this.left?.height ?? 0;
    if (leftHeight > rightHeight + 1) {
      const leftRightHeight = this.left?.right?.height ?? 0;
      const leftLeftHeight = this.left?.left?.height ?? 0;
      if (leftRightHeight > leftLeftHeight) {
        this.left?.rotateRR();
      }
      this.rotateLL();
    } else if (rightHeight > leftHeight + 1) {
      const rightRightHeight = this.right?.right?.height ?? 0;
      const rightLeftHeight = this.right?.left?.height ?? 0;
      if (rightLeftHeight > rightRightHeight) {
        this.right?.rotateLL();
      }
      this.rotateRR();
    }
  }

  private updateInNewLocation(): void {
    if (!this.right && !this.left) {
      this.height = 1;
    } else if (!this.right || (this.left && this.right.height < this.left.height)) {
      this.height = (this.left?.height ?? 0) + 1;
    } else {
      this.height = (this.right?.height ?? 0) + 1;
    }
  }

  private rotateRR(): void {
    const valueBefore = this.value;
    const leftBefore = this.left;
    this.value = this.right?.value;
    this.left = this.right;
    this.right = this.right?.right ?? null;
    if (this.left) {
      this.left.right = this.left.left ?? null;
      this.left.left = leftBefore;
      this.left.value = valueBefore;
      this.left.updateInNewLocation();
    }
    this.updateInNewLocation();
  }

  private rotateLL(): void {
    const valueBefore = this.value;
    const rightBefore = this.right;
    this.value = this.left?.value;
    this.right = this.left;
    this.left = this.left?.left ?? null;
    if (this.right) {
      this.right.left = this.right.right ?? null;
      this.right.right = rightBefore;
      this.right.value = valueBefore;
      this.right.updateInNewLocation();
    }
    this.updateInNewLocation();
  }
}

class AVLTree {
  private _root!: AVLTreeNode | null;

  constructor() {
    this._root = null;
  }

  public add(value: any): void {
    if (!this._root) {
      this._root = new AVLTreeNode(value);
    } else {
      this._root.add(value);
    }
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

describe('avl tree', function () {
  it('works correctly', function () {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new AVLTree();
    nums.map((num) => tree.add(num));
    const objs = tree.toObject();

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
