#!/usr/bin/env node

const { exec } = require('child_process');

export async function starterAppDev(options) {
  let liveServer = `"live-server --port=3000 ${options.input}"`;
  let nodeSass = `"node-sass -w ${options.input} -o ${options.input}"`;
  let tscWatch = !options.noTS ? '"tsc -w"' : "";

  let cmd = `concurrently ${liveServer} ${nodeSass} ${tscWatch}`;

  exec(cmd, (error, stdout, stderr) => {
    console.log(stdout);

    if (error) {
      console.warn(`ERROR: ${cmd}`);
    } else {
      console.log('.');
    }
    console.log('Done!');
  });
}