//Very Fast Prefix Sum Solution :o
const readline = require('readline');

const input = (prompt, counter, lineReader) => {
  return new Promise(resolve => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    //No for await (const line of rl) cause copy paste into console doesn't work for some reason
    rl.question(prompt, (answer) => {
      rl.on('line', line => {
        lineReader(line);
        if (counter() === +answer) {
          rl.close();
          resolve();
        }
      });
    });
  });
}

let sum = 0;
const prefixSums = [0];
const queryResult = [];

const record = n => prefixSums.push(sum += n);
const numberOfRecords = () => prefixSums.length - 1;
const query = (left, right) => queryResult.push(prefixSums[right] - prefixSums[left-1]);
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