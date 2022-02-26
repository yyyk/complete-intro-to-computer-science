/**
 * time: O(n)
 * space: O(1)
 */

function linearSearch(num: number, nums: number[]): number {
  for (let i = 0; i < nums.length; i++) {
    if (num === nums[i]) {
      return i;
    }
  }
  return -1;
}

describe('linear search', function () {
  it('searches correctly', function () {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(linearSearch(4, nums)).toEqual(3);
    expect(linearSearch(11, nums)).toEqual(-1);
  });
});
