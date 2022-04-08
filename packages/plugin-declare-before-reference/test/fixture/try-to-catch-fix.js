import tryToCatch from 'try-to-catch';
import chalk from 'chalk';
import { Command, Option, CommanderError } from 'commander';

const program = new Command();

program.exitOverride();

const [error] = await tryToCatch(program.parseAsync, process.argv);

if (error) {
  if (error instanceof InvalidConfigError) {
    console.warn(chalk.red(error.message));
    process.exit(7);
  }

  console.error(chalk.red(error));
  process.exit(1);
}
