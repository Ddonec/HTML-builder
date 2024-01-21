const fs = require('fs');
const path = require('path');

fs.readFile(path.resolve(__dirname, 'text.txt'), 'UTF-8', (error, text) => {
  if (error) {
    throw error;
  }
  console.log(text);
});
