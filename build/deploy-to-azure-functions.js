const fs = require('fs-extra');
const execSync = require('child_process').execSync;


const check = execSync('git add -n -A').toString();
if (check) {
  console.log('"git add -n -A" ===>\n', check);
  console.error('========================================');
  console.error('** Commit file changes before deploy! **');
  console.error('========================================');
  return;
}


const commands = [
  'git branch deploy-azure',
  'git checkout deploy-azure',
  'git rebase master',
  'npm run build:azure',
  'npm run webpack:prod',
  'node build/copy-bundled-files.js',
  'git add -A',
  'git commit -m "built js files for deploy"',
  'git push origin deploy-azure -f',
  'git checkout master',
  'git branch -D deploy-azure',
];

commands.forEach(command => {
  console.log('='.repeat(20), command);
  try {
    const result = execSync(command).toString();
    console.log('result:', result);
  } catch (err) {
    // console.error('error:', err.Error);
    throw err;
  }
});


const unlinkFiles = [
  'hapi1/main.js.map',
  'express1/main.js.map',
  'lodash/main.js.map',
];

unlinkFiles.forEach(file => {
  try {
    fs.unlinkSync(file);
  } catch (err) {
    console.error('error:', err);
  }
});
