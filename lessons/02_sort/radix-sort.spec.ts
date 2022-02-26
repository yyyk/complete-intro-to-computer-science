/**
 * time: O(n_k)
 * space: O(n+k)
 * destructive
 * stable
 */

function getDigit(num: number, place: number, longestNumber: number): number {
  const str = num.toString();
  const size = str.length;
  const mod = longestNumber - size;
  return parseInt(str.charAt(place - mod)) || 0;
}

function getLongestNumber(nums: number[]): number {
  let longest = 0;
  for (let i = 0; i < nums.length; i++) {
    const currentLength = nums[i].toString().length;
    longest = currentLength > longest ? currentLength : longest;
  }
  return longest;
}

function radixSort(nums: number[]): number[] {
  const longestNumber = getLongestNumber(nums);
  const buckets: number[][] = new Array(10).fill(null).map(() => []);
  for (let i = longestNumber - 1; i >= 0; i--) {
    while (nums.length) {
      const current = nums.shift() as number;
      const digit = getDigit(current, i, longestNumber);
      buckets[digit].push(current);
    }
    for (let j = 0; j < 10; j++) {
      while (buckets[j].length) {
        nums.push(buckets[j].shift() as number);
      }
    }
  }
  return nums;
}

describe('radix sort', function () {
  it('getDigit', function () {
    expect(getDigit(1234, 2, 4)).toEqual(3);
  });

  it('getLongestNumber', function () {
    expect(getLongestNumber([1, 100, 1000])).toEqual(4);
  });

  it('sorts correctly', function () {
    const nums = [20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34, 3000, 3001, 1200, 633];
    const result = [1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944, 1200, 1244, 3000, 3001];
    const sortedNums = radixSort(nums);
    expect(sortedNums).toEqual(result);
  });
});
