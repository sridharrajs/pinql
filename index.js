'use strict';

const chalk = require('chalk')

const server = require('./bin/server')

server.start().catch(reason => {
  console.trace(chalk.red(reason))
  process.exit(0)
})
