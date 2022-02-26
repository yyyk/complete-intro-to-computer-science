import { getUser } from '../../data/jobs';

function findMostCommonTitle(myId: number, degreesOfSeparation: number): string {
  let queue = [myId];
  const seen = new Set(queue);
  const jobs: { [key: string]: number } = {};
  for (let i = 0; i <= degreesOfSeparation; i++) {
    const newQueue = [];
    while (queue.length) {
      const user = getUser(queue.shift() as number);
      for (let j = 0; j < (user?.connections?.length ?? 0); j++) {
        const connection = user?.connections[j];
        if (connection && !seen.has(connection)) {
          newQueue.push(connection);
          seen.add(connection);
        }
      }
      if (user?.title) {
        jobs[user.title] = jobs[user.title] ? jobs[user.title] + 1 : 1;
      }
    }
    queue = newQueue;
  }
  const jobKeys = Object.keys(jobs);
  let biggestNumber = jobs[jobKeys[0]];
  let jobName = jobKeys[0];

  for (let i = 1; i < jobKeys.length; i++) {
    const currentJob = jobKeys[i];
    if (jobs[currentJob] > biggestNumber) {
      jobName = currentJob;
      biggestNumber = jobs[currentJob];
    }
  }
  // see all job titles, sorted
  // jobKeys
  //   .map((id) => [id, jobs[id]])
  //   .sort((a, b) => b[1] - a[1])
  //   .slice(0, 10)
  //   .forEach(([job, num]) => console.log(`${num} – ${job}`));
  // console.log("======");
  return jobName;
}

describe('findMostCommonTitle', function () {
  it('user 30 with 2 degrees of separation', () => {
    expect(findMostCommonTitle(30, 2)).toBe('Librarian');
  });

  it('user 11 with 3 degrees of separation', () => {
    expect(findMostCommonTitle(11, 3)).toBe('Graphic Designer');
  });

  it('user 307 with 4 degrees of separation', () => {
    expect(findMostCommonTitle(306, 4)).toBe('Pharmacist');
  });

  it("user 1 with 7 degrees of separation – this will traverse every user that's followed by someone else. five users are unfollowed", () => {
    expect(findMostCommonTitle(1, 7)).toBe('Geological Engineer');
  });
});
