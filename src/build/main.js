#!/usr/bin/env node

const { exec } = require('child_process');

const commandsInitialize = [
  // 1. dist: Remove folder
  "rm -Rf dist",

  // 2. src->dist: Copy all files from src to dist
  "copyfiles src/*.* src/**/*.* src/**/**/*.* src/**/**/**/*.* dist",

  // 3. dist: Move dist/src to dist
  "mv dist/src/* dist",

  // 4. dist/src: Remove folder
  "rm -Rf dist/src"
];

const commandsHTML = [
  // 1. dist: HTML Minifier
  "foreach -g 'dist/**/**/**/**/*.html' -x 'html-minifier #{path} -o #{path} --collapse-whitespace'",
];

const commandsCSS = [
  // 1. src and dist: SASS to CSS
  "node-sass -r src -o src",
  "node-sass -r dist -o dist",

  // 2. dist: Minify CSS
  "foreach -g 'dist/**/**/**/*.css' -x 'cleancss --source-map -o #{dir}/#{name}.css #{path}'",

  // 3. dist: PostCSS + Autoprefixer
  "foreach -g 'dist/**/**/**/*.css' -x 'postcss #{path} --use autoprefixer -r'",
];

const commandsJS = [
  // 1. src and dist: TS to JS
  "foreach -g 'src/**/**/**/*.ts' -x 'tsc #{path}'",
  "foreach -g 'dist/**/**/**/*.ts' -x 'tsc #{path}'",

  // 2. dist: Minify JS
  "uglifyjs-folder dist -eo dist -x .js --pattern '**/*.js,!**/*min.js'",

  // 3. dist: Babel
  "babel dist -d dist",
];

const commandsWrapUp = [
  // 1. dist: Remove SCSS and TS
  "foreach -g 'dist/**/**/**/*.scss' -x 'rm #{path}'",
  "foreach -g 'dist/**/**/**/*.ts' -x 'rm #{path}'",
];

const commands = [
  ...commandsInitialize,
  ...commandsHTML,
  ...commandsCSS,
  ...commandsJS,
  ...commandsWrapUp
];

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {
    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(`ERROR: ${cmd}`);
      } else {
        console.log('.');
      }
      resolve(stdout? stdout : stderr);
    })

  });
}

export async function starterAppBuild(options) {
  commands.forEach((command, index) => {
    commands[index] = command
      .replace(/src/g, options.input)
      .replace(/dist/g, options.output);
  });

  await asyncForEach(commands, async (command) => {
    await execShellCommand(command);
  });
  console.log('Done!');
}