function nestedAdd(arr: any[]): number {
  let sum = 0;
  for (let i = 0; i < arr.length; i++) {
    const current = arr[i];
    if (Array.isArray(current)) {
      sum += nestedAdd(current);
    } else {
      sum += current;
    }
  }
  return sum;
}

function factorial(n: number): number {
  if (n < 2) {
    return 1;
  }
  return n * factorial(n - 1);
}

describe('recursion', function() {
  it('nestedAdd adds nested array', function() {
    expect(nestedAdd([1, 2, 3])).toEqual(6);
    expect(nestedAdd([1, [2, 3]])).toEqual(6);
    expect(nestedAdd([[[[[[5]]]]]])).toEqual(5);
    expect(nestedAdd([10, [12, 14, [1], [16, [20]]], 10, 11])).toEqual(94);
  });

  it('factorial', function() {
    expect(factorial(1)).toEqual(1);
    expect(factorial(2)).toEqual(2);
    expect(factorial(3)).toEqual(6);
    expect(factorial(10)).toEqual(3628800);
  });
});

