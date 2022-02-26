/**
 * time: O(n log n)
 * space: O(n)
 * non-destructive
 * stable
 */

function merge(sortedLeft: number[], sortedRight: number[]): number[] {
  const result: number[] = [];
  while (sortedLeft.length && sortedRight.length) {
    if (sortedLeft[0] <= sortedRight[0]) {
      result.push(sortedLeft.shift() as number);
    } else {
      result.push(sortedRight.shift() as number);
    }
  }
  // return result.concat(sortedLeft, sortedRight);
  return [...result, ...sortedLeft, ...sortedRight];
}

function mergeSort(nums: number[]): number[] {
  if (nums.length <= 1) {
    return nums;
  }
  const length = nums.length;
  const middle = Math.floor(length / 2);
  const left = nums.slice(0, middle);
  const right = nums.slice(middle);
  const sortedLeft = mergeSort(left);
  const sortedRight = mergeSort(right);
  return merge(sortedLeft, sortedRight);
}

describe('merge sort', function () {
  it('sorts correctly', function () {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sortedNums = mergeSort(nums);
    expect(sortedNums).toEqual(result);
  });
});
