import arg from 'arg';
import { starterAppDev } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--input': String,
      '--output': String,
      '--root': String,
      '-i': '--input',
      '-o': '--output',
      '-r': '--root'
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return {
    input: args['--input'] || 'src',
    output: args['--output'] || 'dist',
    root: args['--root'] || './'
  }
}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  await starterAppDev(options);
}