import XXH from 'xxhashjs';

class BloomFilter {
  private _arr!: number[];

  static FILTER_SIZE = 100;

  constructor() {
    this._arr = new Array(BloomFilter.FILTER_SIZE).fill(0);
  }

  static h1(str: string): number {
    return Math.abs(XXH.h32(0xabcd).update(str).digest().toNumber() % BloomFilter.FILTER_SIZE);
  }

  static h2(str: string): number {
    return Math.abs(XXH.h32(0x1234).update(str).digest().toNumber() % BloomFilter.FILTER_SIZE);
  }

  static h3(str: string): number {
    return Math.abs(XXH.h32(0x6789).update(str).digest().toNumber() % BloomFilter.FILTER_SIZE);
  }

  public add(str: string) {
    this._arr[BloomFilter.h1(str)] = 1;
    this._arr[BloomFilter.h2(str)] = 1;
    this._arr[BloomFilter.h3(str)] = 1;
  }

  public contains(str: string): boolean {
    return !!(this._arr[BloomFilter.h1(str)] && this._arr[BloomFilter.h2(str)] && this._arr[BloomFilter.h3(str)]);
  }
}

describe('BloomFilter', function () {
  let bf: BloomFilter;

  beforeEach(() => {
    bf = new BloomFilter();
  });

  it('returns false when empty', () => {
    expect(bf.contains('Brian')).toBe(false);
    expect(bf.contains('Sarah')).toBe(false);
    expect(bf.contains('Simona')).toBe(false);
  });

  it('handles one item', () => {
    expect(bf.contains('Brian')).toBe(false);
    bf.add('Brian');
    expect(bf.contains('Brian')).toBe(true);
    expect(bf.contains('Sarah')).toBe(false);
    expect(bf.contains('Simona')).toBe(false);
  });

  it('handles many items', () => {
    const names = ['Brian', 'Simona', 'Sarah', 'Asim', 'John', 'Sean', 'Jessie', 'Paige', 'Ashley'];
    names.forEach((item) => bf.add(item));
    names.forEach((item) => expect(bf.contains(item)).toBe(true));
    ['Sam', 'Chris', 'Taylor', 'Florence'].forEach((item) => expect(bf.contains(item)).toBe(false));
  });
});
