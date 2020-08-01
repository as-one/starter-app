import arg from 'arg';
import inquirer from 'inquirer';
import chalk from 'chalk';
import { createStarterApp } from './main';

function parseArgumentsIntoOptions(rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install',
    },
    {
      argv: rawArgs.slice(2)
    }
  );

  return (args['--yes']) ? {
    skipPrompts: true,
    git: true,
    runInstall: true,
    targetDir: 'my-starter-app',
  } : {
    skipPrompts: false,
    git: args['--git'] || false,
    runInstall: args['--install'] || false,
    targetDir: args._[0] || false,
  }
}

async function promptForMissingOptions(options) {
  const hexBlue = '#52C2C4',
        hexGreen = '#5AC130',
        questions = [];

  if (!options.skipPrompts && !options.targetDir) {

    console.error(`Please specify the project directory:\n` +
      `  %s %s\n\n` +
      `For example:\n` +
      `  %s %s\n\n`,

      chalk.hex(hexBlue).bold('create-starter-app'),
      chalk.hex(hexGreen).bold('<project-directory>'),
      chalk.hex(hexBlue).bold('create-starter-app'),
      chalk.hex(hexGreen).bold('my-starter-app')
    );
    process.exit(1);
  }

  if (!options.skipPrompts && !options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Initialize a git repository?',
      default: false,
    });
  }

  if (!options.skipPrompts && !options.runInstall) {
    questions.push({
      type: 'confirm',
      name: 'runInstall',
      message: 'Install all dependencies?',
      default: false,
    });
  }

  const answers = await inquirer.prompt(questions);
  return {
    ...options,
    git: options.git || answers.git,
    runInstall: options.runInstall || answers.runInstall,
    targetDir: options.targetDir || answers.targetDir
  };

}

export async function cli(args) {
  let options = parseArgumentsIntoOptions(args);
  options = await promptForMissingOptions(options);
  await createStarterApp(options);
}