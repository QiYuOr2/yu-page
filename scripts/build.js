const fs = require('fs-extra');
const path = require('path');

fs.removeSync(path.join(__dirname, '../dist'), { force: true });

fs.copySync(
  path.join(__dirname, '../packages/editor/dist'),
  path.join(__dirname, '../dist/editor')
);
fs.copySync(
  path.join(__dirname, '../packages/template/dist'),
  path.join(__dirname, '../dist/template')
);
