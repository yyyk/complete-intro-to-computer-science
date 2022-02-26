interface TreeNode {
  value: any;
  left: TreeNode | null;
  right: TreeNode | null;
}

function preOrderTraverse(node: TreeNode | null | undefined, arr: any[]): any[] {
  if (!node) {
    return arr;
  }
  arr.push(node.value);
  arr = preOrderTraverse(node.left, arr);
  arr = preOrderTraverse(node.right, arr);
  return arr;
}

function inOrderTraverse(node: TreeNode | null | undefined, arr: any[]): any[] {
  if (!node) {
    return arr;
  }
  arr = inOrderTraverse(node.left, arr);
  arr.push(node.value);
  arr = inOrderTraverse(node.right, arr);
  return arr;
}

function postOrderTraverse(node: TreeNode | null | undefined, arr: any[]): any[] {
  if (!node) {
    return arr;
  }
  arr = postOrderTraverse(node.left, arr);
  arr = postOrderTraverse(node.right, arr);
  arr.push(node.value);
  return arr;
}

describe('depth first tree traversal', function () {
  const tree: TreeNode = {
    value: 8,
    left: {
      value: 4,
      left: {
        value: 3,
        left: {
          value: 2,
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 5,
        left: null,
        right: {
          value: 7,
          left: {
            value: 6,
            left: null,
            right: null,
          },
          right: null,
        },
      },
    },
    right: {
      value: 12,
      left: {
        value: 10,
        left: {
          value: 9,
          left: null,
          right: null,
        },
        right: {
          value: 11,
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  it('preOrderTraverse', () => {
    expect(preOrderTraverse(tree, [])).toEqual([8, 4, 3, 2, 5, 7, 6, 12, 10, 9, 11]);
  });

  it('inOrderTraverse', () => {
    expect(inOrderTraverse(tree, [])).toEqual([2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]);
  });

  it('postOrderTraverse', () => {
    expect(postOrderTraverse(tree, [])).toEqual([2, 3, 6, 7, 5, 4, 9, 11, 10, 12, 8]);
  });
});
