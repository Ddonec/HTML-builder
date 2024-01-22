const fs = require('fs').promises;
const path = require('path');

const old = path.join(__dirname, 'styles');
const copy = path.join(__dirname, 'project-dist');

async function compileStyles() {
  const files = await fs.readdir(old);
  const targetFile = path.join(copy, 'bundle.css');

  await fs.writeFile(targetFile, '');

  for (const file of files) {
    if (path.extname(file) === '.css') {
      const data = await fs.readFile(path.join(old, file), 'utf-8');
      await fs.appendFile(targetFile, data);
    }
  }

  console.log(`\nall css files collected in "bundle.css"\n`);
}

compileStyles();
