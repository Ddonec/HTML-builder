const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');
const files = fs.readdirSync(dir, { withFileTypes: true });
const onlyFiles = checkFolder();

function checkFolder() {
  return files
    .filter((file) => file.isFile())
    .map((file) => path.join(dir, file.name));
}

function inspectFile(files) {
  files.forEach((filePath) => {
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(filePath);
    const fileSize = (fs.statSync(filePath).size / 1024).toFixed(3);

    console.log(fileName + ' - ' + fileExtension + ' - ' + fileSize + ' kb');
  });
}

inspectFile(onlyFiles);
