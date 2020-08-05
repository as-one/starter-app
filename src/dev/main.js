#!/usr/bin/env node

const { exec } = require('child_process');

export async function starterAppDev(options) {
  let liveServer = `live-server --port=3000 --open=${options.input}`;
  let nodeSass = `node-sass -w ${options.input} -o ${options.output}`;
  let tscWatch = "tsc-watch";

  let cmd = `concurrently "${liveServer}" "${nodeSass}" "${tscWatch}"`;

  exec(cmd, (error, stdout, stderr) => {
    if (error) {
      console.warn(`ERROR: ${cmd}`);
    } else {
      console.log('.');
    }
    console.log('Done!');
  });
}