const fs = require('fs').promises;
const path = require('path');

const exportFolder = path.join(__dirname, 'components');
const importFolder = path.join(__dirname, 'project-dist');
const exportIndex = path.join(__dirname, 'template.html');
const importIndex = path.join(importFolder, 'index.html');
const exportCSS = path.join(__dirname, 'styles');
const importCSS = path.join(__dirname, 'project-dist');
const exportAssets = path.join(__dirname, 'assets');
const importAssets = path.join(importFolder, 'assets');

async function HTMLbuilder() {
  try {
    await fs.mkdir(importFolder, { recursive: true });

    let content = await fs.readFile(exportIndex, 'utf-8');

    const tags = content.match(/{{\s*([^}\s]+)\s*}}/g);

    if (tags) {
      for (const tag of tags) {
        const name = tag.replace(/[{}]/g, '').trim();
        const way = path.join(exportFolder, `${name}.html`);
        const data = await fs.readFile(way, 'utf-8');

        content = content.replace(tag, data);
      }
    }

    await fs.writeFile(importIndex, content);
    console.log('\nHTML page will be create and build.\n');
  } catch (error) {
    console.log(error);
  }

  try {
    await compileStyles();
    console.log('all css files collected in "style.css"\n');
  } catch (error) {
    console.log(error);
  }
  try {
    await copyDir(exportAssets, importAssets);
    console.log('all content of "assets" copied to "project-dist/assets"\n');
  } catch (error) {
    console.log(error);
  }
  console.log('sucsess!\n');
}

async function compileStyles() {
  const files = await fs.readdir(exportCSS);
  const targetFile = path.join(importCSS, 'style.css');

  await fs.writeFile(targetFile, '');

  for (const file of files) {
    if (path.extname(file) === '.css') {
      const data = await fs.readFile(path.join(exportCSS, file), 'utf-8');
      await fs.appendFile(targetFile, data);
    }
  }
}

async function copyDir(exportAssets, importAssets) {
  await fs.mkdir(importAssets, { recursive: true });

  const inside = await fs.readdir(exportAssets, { withFileTypes: true });

  for (const entry of inside) {
    const importDir = path.join(exportAssets, entry.name);
    const exportDir = path.join(importAssets, entry.name);
    const whatIs = await fs.stat(importDir);

    if (whatIs.isFile()) {
      await fs.copyFile(importDir, exportDir);
    }
    if (whatIs.isDirectory()) {
      await copyDir(importDir, exportDir);
    }
  }
}

HTMLbuilder();
