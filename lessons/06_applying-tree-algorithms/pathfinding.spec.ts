// import { logMaze } from '../../utils/logger';

export enum OPENED_BY {
  NO_ONE = 0,
  BY_A,
  BY_B,
}

export interface Coordinate {
  x: number;
  y: number;
  closed: boolean;
  length: number;
  openedBy: OPENED_BY;
}

function generateVisited(maze: number[][]): Coordinate[][] {
  // return maze.map((row, y) =>
  //   row.map((location, x) => ({ x, y, closed: location === 1, length: 0, openedBy: OPENED_BY.NO_ONE })),
  // );
  const visited = [];
  for (let y = 0; y < maze.length; y++) {
    const yAxis = [];
    for (let x = 0; x < maze[y].length; x++) {
      const coordinate = { x, y, closed: maze[y][x] === 1, length: 0, openedBy: OPENED_BY.NO_ONE };
      yAxis.push(coordinate);
    }
    visited.push(yAxis);
  }
  return visited;
}

function getNeighbors(visited: Coordinate[][], x: number, y: number): Coordinate[] {
  const neighbors = [];
  if (y - 1 >= 0 && !visited[y - 1][x].closed) {
    // top
    neighbors.push(visited[y - 1][x]);
  }
  if (y + 1 < visited.length && !visited[y + 1][x].closed) {
    // down
    neighbors.push(visited[y + 1][x]);
  }
  if (x - 1 >= 0 && !visited[y][x - 1].closed) {
    // left
    neighbors.push(visited[y][x - 1]);
  }
  if (x + 1 < visited[y].length && !visited[y][x + 1].closed) {
    // right
    neighbors.push(visited[y][x + 1]);
  }
  return neighbors;
}

function findShortestPathLength(maze: number[][], [xA, yA]: [number, number], [xB, yB]: [number, number]): number {
  const visited = generateVisited(maze);
  visited[yA][xA].openedBy = OPENED_BY.BY_A;
  visited[yB][xB].openedBy = OPENED_BY.BY_B;
  // logMaze(visited);

  let aQueue = [visited[yA][xA]];
  let bQueue = [visited[yB][xB]];
  let iteration = 0;
  while (aQueue.length && bQueue.length) {
    iteration++;

    let aNeighbors: Coordinate[] = [];
    while (aQueue.length) {
      const coordinate = aQueue.shift();
      if (coordinate) {
        aNeighbors = aNeighbors.concat(getNeighbors(visited, coordinate.x, coordinate.y));
      }
    }
    for (let i = 0; i < aNeighbors.length; i++) {
      const neighbor = aNeighbors[i];
      if (neighbor.openedBy === OPENED_BY.BY_B) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === OPENED_BY.NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = OPENED_BY.BY_A;
        aQueue.push(neighbor);
      }
    }

    let bNeighbors: Coordinate[] = [];
    while (bQueue.length) {
      const coordinate = bQueue.shift();
      if (coordinate) {
        bNeighbors = bNeighbors.concat(getNeighbors(visited, coordinate.x, coordinate.y));
      }
    }
    for (let i = 0; i < bNeighbors.length; i++) {
      const neighbor = bNeighbors[i];
      if (neighbor.openedBy === OPENED_BY.BY_A) {
        return neighbor.length + iteration;
      } else if (neighbor.openedBy === OPENED_BY.NO_ONE) {
        neighbor.length = iteration;
        neighbor.openedBy = OPENED_BY.BY_B;
        bQueue.push(neighbor);
      }
    }

    // logMaze(visited);
  }

  return -1;
}

describe('pathfinding', function () {
  it('should solve a 4x4 maze', () => {
    const fourByFour = [
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ];
    expect(findShortestPathLength(fourByFour, [0, 0], [3, 3])).toEqual(6);
  });

  it('should solve a 6x6 maze', () => {
    const sixBySix = [
      [0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1, 1],
      [0, 0, 0, 0, 0, 0],
      [0, 0, 2, 0, 0, 0],
    ];
    expect(findShortestPathLength(sixBySix, [1, 1], [2, 5])).toEqual(7);
  });

  it('should solve a 8x8 maze', () => {
    const eightByEight = [
      [0, 0, 1, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 1, 0, 0, 0, 0, 1],
      [0, 0, 0, 0, 0, 1, 0, 0],
      [0, 0, 0, 1, 0, 1, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 0],
      [0, 2, 0, 0, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 1, 2],
    ];
    expect(findShortestPathLength(eightByEight, [1, 7], [7, 7])).toEqual(16);
  });

  it('should solve a 15x15 maze', () => {
    const fifteenByFifteen = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
      [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0],
      [0, 0, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0],
      [0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 1, 1, 2, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 1, 0, 0, 1, 1, 1, 1, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0, 1, 0],
      [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];
    expect(findShortestPathLength(fifteenByFifteen, [1, 1], [8, 8])).toEqual(78);
  });

  it("should solve the maze if they're next to each other", () => {
    const byEachOther = [
      [0, 0, 0, 0, 0],
      [0, 2, 2, 0, 0],
      [0, 0, 0, 0, 0],
      [0, 1, 1, 1, 1],
      [0, 0, 0, 0, 0],
    ];
    expect(findShortestPathLength(byEachOther, [1, 1], [2, 1])).toEqual(1);
  });

  it("should return -1 when there's no possible path", () => {
    const impossible = [
      [0, 0, 0, 0, 0],
      [0, 2, 0, 0, 0],
      [0, 0, 1, 1, 1],
      [1, 1, 1, 0, 0],
      [0, 0, 0, 0, 2],
    ];
    expect(findShortestPathLength(impossible, [1, 1], [4, 4])).toEqual(-1);
  });
});
