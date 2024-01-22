const fs = require('fs');
const path = require('path');

const way = path.resolve(__dirname, 'text.txt');
const stream = fs.createReadStream(way, 'utf-8');

process.stdout.write('\n');
stream.on('end', () => {
  process.stdout.write('\n');
});

stream.pipe(process.stdout);
