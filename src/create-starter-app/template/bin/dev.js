const { exec } = require('child_process');

function init() {

  let cmd = `
    live-server --port=3000 &
    node-sass -w src/ -o src/ &
    tsc-watch
  `;

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
    console.log('Done!');
  });

}

init();
