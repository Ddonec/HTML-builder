const fs = require('fs');
const path = require('path');
const readline = require('readline');

const pt = path.resolve(__dirname, '02-write-file.txt');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function clearFile() {
  fs.access(pt, (error) => {
    if (!error) {
      fs.writeFile(pt, '', (clearError) => {
        if (clearError) {
          console.log(clearError);
        }
      });
    }
  });
}
clearFile();

rl.on('line', (inputValue) => {
  if (inputValue === 'exit' || inputValue === 'EXIT' || inputValue === 'Exit') {
    exitF();
  } else {
    fs.appendFile(pt, inputValue + '\n', (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
});

rl.on('SIGINT', exitF);

function exitF() {
  console.log('See you, bb (^_^).');
  rl.close();
}

console.log('Write your text here (to close enter "exit" or "Ctrl + C"):');
