#!/usr/bin/env node

// const { exec } = require('child_process');

// function init() {

//   let cmd = `
//     live-server --port=3000 --open=src &
//     node-sass -w src/ -o src/ &
//     tsc-watch
//   `;

//   exec(cmd, (error, stdout, stderr) => {
//     if (error) {
//       console.warn(
//         "ERROR: \n" +
//         cmd + "\n" +
//         "Return: " + error
//       );
//     } else {
//       console.log('.');
//     }
//     console.log('Done!');
//   });

// }

// init();

export async function starterCreateApp(options) {
  options = {
    ...options,
    targetDir: `${process.cwd()}/${options.targetDir}`,
  };
  console.log(options);
}