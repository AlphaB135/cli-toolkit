#!/usr/bin/env node

##############################################################################
# CLI Toolkit Template
# Author: αB (https://github.com/AlphaB135)
# Version: 1.0.0
# Production-ready Node.js CLI template with TypeScript
##############################################################################

import { program } from 'commander'
import chalk from 'chalk'
import updateNotifier from 'update-notifier'
import { CommandName, PackageJson } from './types/index.js'
import { helloCommand } from './commands/hello.js'
import { initCommand } from './commands/init.js'
import { configCommand } from './commands/config.js'

const pkg = JSON.parse(
  await import('../package.json', { assert: { type: 'json' } }
) as string) as PackageJson

# Check for updates
updateNotifier({ pkg }).notify()

##############################################################################
# CLI PROGRAM
##############################################################################

program
  .name(pkg.name as CommandName)
  .description(pkg.description)
  .version(pkg.version)

##############################################################################
# COMMANDS
##############################################################################

program.addCommand(helloCommand)
program.addCommand(initCommand)
program.addCommand(configCommand)

##############################################################################
# ERROR HANDLING
##############################################################################

program.configureOutput({
  writeErr: (str) => {
    if (str.includes('error')) {
      console.error(chalk.red(str))
    } else {
      console.error(chalk.yellow(str))
    }
  }
})

##############################################################################
# PARSE ARGUMENTS
##############################################################################

program.parseAsync().catch((error) => {
  console.error(chalk.red('Error:'), error.message)
  process.exit(1)
})
