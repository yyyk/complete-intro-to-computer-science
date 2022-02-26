interface TreeNode {
  value: any;
  left: TreeNode | null;
  right: TreeNode | null;
}

function breadthFirstTraverse(queue: TreeNode[], arr: any[]): any[] {
  while (queue.length) {
    const node = queue.shift();
    arr.push(node?.value);
    if (node?.left) {
      queue.push(node.left);
    }
    if (node?.right) {
      queue.push(node.right);
    }
  }
  return arr;
}

function breadthFirstTraverse2(queue: TreeNode[], arr: any[]): any[] {
  if (!queue.length) {
    return arr;
  }
  const node = queue.shift();
  arr.push(node?.value);
  if (node?.left) {
    queue.push(node.left);
  }
  if (node?.right) {
    queue.push(node.right);
  }
  return breadthFirstTraverse2(queue, arr);
}

describe('breadth first tree traversal', function () {
  const answer = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K'];

  const tree: TreeNode = {
    value: 'A',
    left: {
      value: 'B',
      left: {
        value: 'D',
        left: {
          value: 'G',
          left: null,
          right: null,
        },
        right: null,
      },
      right: {
        value: 'E',
        left: null,
        right: {
          value: 'H',
          left: {
            value: 'K',
            left: null,
            right: null,
          },
          right: null,
        },
      },
    },
    right: {
      value: 'C',
      left: {
        value: 'F',
        left: {
          value: 'I',
          left: null,
          right: null,
        },
        right: {
          value: 'J',
          left: null,
          right: null,
        },
      },
      right: null,
    },
  };

  it('breadthFirstTraverse', () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
    expect(breadthFirstTraverse2([tree], [])).toEqual(answer);
  });
});
