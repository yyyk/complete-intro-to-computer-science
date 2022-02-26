import { OPENED_BY, Coordinate } from '../lessons/06_applying-tree-algorithms/pathfinding.spec';

export function logMaze(maze: Coordinate[][]) {
  console.log('================');
  let header = 'XX | ';
  let subheader = '-----';
  for (let i = 0; i < maze[0].length; i++) {
    const num = i >= 10 ? i : '0' + i;
    header += `${num} `;
    subheader += '---';
  }
  console.log(header);
  console.log(subheader);
  maze.forEach((row, i) => {
    const num = i >= 10 ? i : '0' + i;
    let buffer = `${num} | `;
    const colors: string[] = [];

    row.forEach((item) => {
      if (item.closed) {
        buffer += '%cXX ';
        colors.push('color: gray');
      } else if (item.openedBy === OPENED_BY.NO_ONE) {
        buffer += '%c•• ';
        colors.push('color: lightgray');
      } else {
        buffer += '%c' + (item.length >= 10 ? item.length : '0' + item.length) + ' ';
        colors.push(item.openedBy === OPENED_BY.BY_A ? 'color: lime' : 'color: hotpink');
      }
    });

    console.log(buffer, ...colors);
  });
}
