const { exec } = require('child_process');

const commandsHTML = [
  // Copy HTML from src to dist
  "copyfiles *.html src/*.html src/**/*.html src/**/**/*.html dist",

  // HTML Minifier in dist
  "foreach -g 'dist/*.html' -x 'html-minifier #{path} -o #{path} --collapse-whitespace'",
  "foreach -g 'dist/src/**/**/*.html' -x 'html-minifier #{path} -o #{path} --collapse-whitespace'",
];

const commandsCSS = [
  // SASS to CSS in src
  "node-sass -r src/ -o src/",

  // CSS to .min.css in src
  "foreach -g 'src/**/**/*.css' -x 'cleancss --source-map -o #{dir}/#{name}.min.css #{path}'",

  // PostCSS + Autoprefixer in src
  "foreach -g 'src/**/**/*.min.css' -x 'postcss #{path} --use autoprefixer -r'",

  // Copy .min.css and .min.css.map from src to dist
  "copyfiles src/*.min.css src/**/*.min.css src/**/**/*.min.css dist",
  "copyfiles src/*.min.css.map src/**/*.min.css.map src/**/**/*.min.css.map dist",

  // Remove .min.css and .min.css.map from src
  "foreach -g 'src/**/**/*.min.css' -x 'rm #{path}'",
  "foreach -g 'src/**/**/*.min.css.map' -x 'rm #{path}'",

  // Replace in HTML in dist
  "foreach -g 'dist/*.html' -x 'replace-in-file .css .min.css #{path}'",
  "foreach -g 'dist/src/**/**/*.html' -x 'replace-in-file .css .min.css #{path}'",
];

const commandsJS = [
  // TS to JS in src
  "foreach -g 'src/**/**/*.ts' -x 'tsc #{path}'",

  // JS to .min.js from src to dist
  "uglifyjs-folder src -eo dist/src --pattern '**/*.js,!**/*min.js'",

  // Babel
  "babel dist -d dist",

  // Replace in HTML in dist
  "foreach -g 'dist/*.html' -x 'replace-in-file .js .min.js #{path}'",
  "foreach -g 'dist/src/**/**/*.html' -x 'replace-in-file .js .min.js #{path}'",
];

const commands = [
  "rm -Rf dist",
  ...commandsHTML,
  ...commandsCSS,
  ...commandsJS
];

/**
 * Executes a shell command and return it as a Promise.
 * @param cmd {string}
 * @return {Promise<string>}
 */
function execShellCommand(cmd) {
  return new Promise((resolve, reject) => {

    exec(cmd, (error, stdout, stderr) => {
      if (error) {
        console.warn(
          "ERROR: \n" +
          cmd + "\n" +
          "Return: " + error
        );
      } else {
        console.log('.');
      }

      resolve(stdout? stdout : stderr);
    })

  });
}

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}

const init = async () => {
  await asyncForEach(commands, async (command) => {
    await execShellCommand(command);
  });
  console.log('Done!');
}

init();