#!/usr/bin/env node

import { Command } from 'commander';
import genDiff from '../src/index.js';
import stylish from '../src/stylish.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .arguments('<filepath1> <filepath2>')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2, option = 'stylish') => {   // переделать option (шаг 6)
    const diff = genDiff(filepath1, filepath2);
    const output = stylish(diff);
    console.log(output);
  });

program.parse();
