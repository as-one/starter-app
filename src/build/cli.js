import arg from 'arg';
import { starterAppBuild } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--input': String,
      '--output': String,
      '-i': '--input',
      '-o': '--output'
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    input: args['--input'] || 'src',
    output: args['--output'] || 'dist'
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await starterAppBuild(options);
}