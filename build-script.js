const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
  const files = [
  './dist/poc-github-contigo/runtime.js',
  './dist/poc-github-contigo/polyfills.js',
  './dist/poc-github-contigo/main.js'
  ];
  await fs.ensureDir('elements');
  await concat(files, 'elements/poc-github-contigo.js');
  await fs.copyFile(
  './dist/poc-github-contigo/styles.css',
  'elements/poc-github-contigo.css'
  );
})();






