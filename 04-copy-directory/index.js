const fs = require('fs').promises;
const path = require('path');

const old = path.join(__dirname, 'files');
const copy = path.join(__dirname, 'files-copy');
async function copyDir(old, copy) {
  await fs.mkdir(copy, { recursive: true });

  const inside = await fs.readdir(old, { withFileTypes: true });

  for (const entry of inside) {
    await fs.copyFile(path.join(old, entry.name), path.join(copy, entry.name));
  }

  console.log("\nall content of 'files' will be copied to 'files-copy'\n");
}

copyDir(old, copy);
