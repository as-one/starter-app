#!/usr/bin/env node

const { exec } = require('child_process');

const commandsInitialize = [
  "rm -Rf dist"
];

const commandsHTML = [
  // Copy HTML from src to dist
  "copyfiles --up 2 src/*.html src/**/*.html src/**/**/*.html src/**/**/**/*.html dist",

  // HTML Minifier in dist
  "foreach -g 'dist/**/*.html' -x 'html-minifier #{path} -o #{path} --collapse-whitespace'",
];

const commandsCSS = [
  // 1. src: SASS to CSS
  "node-sass -r src/ -o src/",

  // 2. src: CSS to .min.css
  "foreach -g 'src/**/**/**/*.css' -x 'cleancss --source-map -o #{dir}/#{name}.min.css #{path}'",

  // 3. src: PostCSS + Autoprefixer in .min.css
  "foreach -g 'src/**/**/**/*.min.css' -x 'postcss #{path} --use autoprefixer -r'",

  // 4. src->dist: Copy .min.css and .min.css.map from src to dist
  "copyfiles --up 2 src/*.min.css src/**/*.min.css src/**/**/*.min.css src/**/**/**/*.min.css dist",
  "copyfiles --up 2 src/*.min.css.map src/**/*.min.css.map src/**/**/*.min.css.map src/**/**/**/*.min.css.map dist",

  // 5. src: Remove .min.css and .min.css.map from src
  "foreach -g 'src/**/**/**/*.min.css' -x 'rm #{path}'",
  "foreach -g 'src/**/**/**/*.min.css.map' -x 'rm #{path}'",

  // 6. dist/*.html: Replace .css for .min.css
  "foreach -g 'dist/**/**/**/**/*.html' -x 'replace-in-file .css .min.css #{path}'",
];

const commandsJS = [
  // TS to JS in src
  "foreach -g 'src/**/**/**/*.ts' -x 'tsc #{path}'",

  // JS to .min.js from src to dist
  "uglifyjs-folder src -eo dist --pattern '**/*.js,!**/*min.js'",

  // Babel
  "babel dist -d dist",

  // Replace in HTML in dist
  "foreach -g 'dist/**/**/**/**/*.html' -x 'replace-in-file .js .min.js #{path}'",
];

const commandsWrapUp = [
  // None
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