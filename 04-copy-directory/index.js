const fs = require('fs').promises;
const path = require('path');

const old = path.join(__dirname, 'files');
const copy = path.join(__dirname, 'files-copy');

async function copyDir(old, copy) {
  await fs.mkdir(copy, { recursive: true });

  const insideOld = await fs.readdir(old, { withFileTypes: true });
  const insideCopy = await fs.readdir(copy, { withFileTypes: true });

  for (const entry of insideCopy) {
    const delleteCheck = path.join(copy, entry.name);

    if (!insideOld.find((file) => file.name === entry.name)) {
      await fs.unlink(delleteCheck);
      console.log('\nfile ' + entry.name + " will be deletted");
    }
  }

  for (const entry of insideOld) {
    const exportFile = path.join(old, entry.name);
    const delleteCheck = path.join(copy, entry.name);

    await fs.copyFile(exportFile, delleteCheck);
  }

  console.log("\nall content of 'files' will be copied to 'files-copy'\n");
}

copyDir(old, copy);
