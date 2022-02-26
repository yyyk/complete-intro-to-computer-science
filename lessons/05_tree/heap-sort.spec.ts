/**
 * time: O(n log n)
 * space: O(1)
 */

function createMaxHeap(arr: any[]) {
  for (let i = Math.floor(arr.length / 2) - 1; i >= 0; i--) {
    heapify(arr, i, arr.length);
  }
}

function heapify(arr: any[], index: number, heapSize: number) {
  const left = 2 * index + 1;
  const right = 2 * index + 2;
  let largestValueIndex = index;
  if (heapSize > left && arr[largestValueIndex] < arr[left]) {
    largestValueIndex = left;
  }
  if (heapSize > right && arr[largestValueIndex] < arr[right]) {
    largestValueIndex = right;
  }
  if (largestValueIndex !== index) {
    swapPlace(index, largestValueIndex, arr);
    heapify(arr, largestValueIndex, heapSize);
  }
}

function swapPlace(index1: number, index2: number, arr: any[]): any[] {
  let temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
}

function heapSort(arr: any[]): any[] {
  createMaxHeap(arr);
  for (let i = arr.length - 1; i > 0; i--) {
    swapPlace(0, i, arr);
    heapify(arr, 0, i);
  }
  return arr;
}

describe('heap sort', function () {
  it('sorts correctly', function () {
    const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];
    heapSort(nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
