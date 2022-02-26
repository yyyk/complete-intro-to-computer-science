/**
 * time: O(n log n) - O(n^2)
 * space: O(n)
 * non-destructive
 * unstable
 */

function quickSort(nums: number[]): number[] {
  if (nums.length <= 1) {
    return nums;
  }
  const pivot = nums[nums.length - 1];
  const left = [];
  const right = [];
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] < pivot) {
      left.push(nums[i]);
    } else {
      right.push(nums[i]);
    }
  }
  // const sortedLeft = quickSort(left);
  // const sortedRight = quickSort(right);
  // return sortedLeft.concat(pivot, sortedRight);
  return [...quickSort(left), pivot, ...quickSort(right)];
}

describe('quick sort', function () {
  it('sorts correctly', function () {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sortedNums = quickSort(nums);
    expect(sortedNums).toEqual(result);
  });
});
