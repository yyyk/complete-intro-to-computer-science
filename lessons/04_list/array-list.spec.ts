/**
 * time: lookup -> O(1), deletion -> O(n)
 * space: O(n)
 */

class ArrayList {
  private _data!: { [key: number]: any };
  private _length!: number;

  constructor() {
    this._data = {};
    this._length = 0;
  }

  get length(): number {
    return this._length;
  }

  public get(index: number): any {
    return this._data[index];
  }

  public push(value: any): void {
    this._data[this._length] = value;
    this._length++;
  }

  public pop(): any {
    // if (this._length === 0) {
    //   return null;
    // }
    // const value = this._data[this._length - 1];
    // delete this._data[this._length - 1];
    // this._length--;
    // return value;
    return this.delete(this._length - 1);
  }

  public delete(index: number): any {
    const value = this._data[index];
    this.collapseTo(index);
    return value;
  }

  private collapseTo(index: number): void {
    for (let i = index; i < this._length; i++) {
      this._data[i] = this._data[i + 1];
    }
    delete this._data[this._length - 1];
    this._length--;
  }
}

describe('array list', function () {
  it('length, get, push, pop, delete', function () {
    const arrayList = new ArrayList();

    expect(arrayList.length).toEqual(0);
    expect(arrayList.get(0)).toEqual(undefined);

    arrayList.push(1);
    expect(arrayList.get(0)).toEqual(1);
    arrayList.push(3);
    expect(arrayList.get(1)).toEqual(3);
    arrayList.push(7);
    expect(arrayList.get(2)).toEqual(7);
    arrayList.push(3);
    expect(arrayList.get(3)).toEqual(3);
    expect(arrayList.length).toEqual(4);

    expect(arrayList.pop()).toEqual(3);
    expect(arrayList.length).toEqual(3);
    expect(arrayList.get(0)).toEqual(1);
    expect(arrayList.get(1)).toEqual(3);
    expect(arrayList.get(2)).toEqual(7);
    expect(arrayList.get(3)).toEqual(undefined);

    expect(arrayList.delete(1)).toEqual(3);
    expect(arrayList.length).toEqual(2);
    expect(arrayList.get(0)).toEqual(1);
    expect(arrayList.get(1)).toEqual(7);
    expect(arrayList.get(2)).toEqual(undefined);

    arrayList.push(1);
    expect(arrayList.get(2)).toEqual(1);
    expect(arrayList.length).toEqual(3);
  });
});
