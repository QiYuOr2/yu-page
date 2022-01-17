#!/usr/bin/env node

const yargs = require('yargs');

const { create } = require('../actions');

yargs
  .command(
    'create <name>',
    'create a new template',
    (y) => {
      y.positional('name', { describe: 'tempalte name' });
    },
    create
  )
  .help().argv;
