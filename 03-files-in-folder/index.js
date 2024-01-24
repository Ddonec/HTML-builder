const fs = require('fs').promises;
const path = require('path');
const dir = path.join(__dirname, 'secret-folder');

async function inspectFolder(dir) {
  const files = await fs.readdir(dir, { withFileTypes: true });

  const onlyFiles = files
    .filter((file) => file.isFile())
    .map((file) => path.join(dir, file.name));

  for (const filePath of onlyFiles) {
    const fileName = path.basename(filePath);
    const fileExtension = path.extname(filePath);
    const stats = await fs.stat(filePath);
    const fileSize = (stats.size / 1024).toFixed(3);

    console.log(fileName + ' - ' + fileExtension + ' - ' + fileSize + ' kb');
  }
}

inspectFolder(dir);
