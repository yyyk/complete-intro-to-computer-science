/**
 * time: O(n^2)
 * space: O(1)
 * destructive
 * stable
 */

function bubbleSort(nums: number[]): number[] {
  let swapped = false;
  do {
    swapped = false;
    for (let i = 0; i < nums.length - 1; i++) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
  } while (swapped);
  return nums;
}

function bubbleSortOptimised(nums: number[]): number[] {
  let swapped = false;
  let iter = 1;
  do {
    swapped = false;
    for (let i = 0; i < nums.length - iter; i++) {
      if (nums[i] > nums[i + 1]) {
        const temp = nums[i];
        nums[i] = nums[i + 1];
        nums[i + 1] = temp;
        swapped = true;
      }
    }
    iter++;
  } while (swapped || iter <= nums.length);
  return nums;
}

describe('bubble sort', function () {
  it('sorts correctly', function () {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sortedNums = bubbleSort(nums);
    expect(sortedNums).toEqual(result);
  });

  it('sorts correctly with optimised version', function () {
    const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
    const result = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const sortedNums = bubbleSortOptimised(nums);
    expect(sortedNums).toEqual(result);
  });
});
