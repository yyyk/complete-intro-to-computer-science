/**
 * time: O(log n)
 * space: O(1)
 */

function binarySearch(num: number, nums: number[]): number {
  let min = 0;
  let max = nums.length - 1;
  let index;
  let element;
  while (min <= max) {
    index = Math.floor((min + max) / 2);
    element = nums[index];
    if (element < num) {
      min = index + 1;
    } else if (element > num) {
      max = index - 1;
    } else {
      return index;
    }
  }
  return -1;
}

describe('binary search', function () {
  it('searches correctly', function () {
    const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    expect(binarySearch(4, nums)).toEqual(3);
    expect(binarySearch(11, nums)).toEqual(-1);
  });
});
