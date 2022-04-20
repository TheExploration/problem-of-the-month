//Very Fast Prefix Sum Solution
const readline = require('readline');

function input(prompt, counter, lineReader) {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    rl.question(prompt, async (answer) => {
      for await (const line of rl) {
        lineReader(line);
        if (counter() === +answer) {
          rl.close();
          resolve();
        }
      }
    });
  });
}

let sum = 0;
const prefixSums = [];
const queryResult = [];

const record = n => prefixSums.push(sum += n);
const numberOfRecords = () => prefixSums.length;
const query = (left, right) => {
    if (left === 1) {
        queryResult.push(prefixSums[right - 1]);
    } else {
        queryResult.push(prefixSums[right - 1] - prefixSums[left - 2]);
    }
};
const numberOfQueries = () => queryResult.length;
const report = () => queryResult.forEach(v => console.log(v));

(async () => {
  await input('Input:\n', numberOfRecords, line => record(+line));
  await input('', numberOfQueries, line => {
      const [left, right] = line.split(' ');
      query(+left, +right);
    });
  console.log('Output:');
  report();
})();