##############################################################################
# Hello Command
##############################################################################

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import { HelloOptions } from '../types/index.js'

export const helloCommand = new Command('hello')
  .description('Say hello to someone')
  .option('-n, --name <name>', 'Name to greet', 'World')
  .option('-s, --shout', 'Shout the greeting', false)
  .action(async (options: HelloOptions) => {
    const spinner = ora('Preparing greeting...').start()

    await new Promise(resolve => setTimeout(resolve, 500))

    spinner.stop()

    const greeting = `Hello, ${options.name}!`
    const message = options.shout ? greeting.toUpperCase() : greeting

    if (options.shout) {
      console.log(chalk.bold.bgGreen(message))
    } else {
      console.log(chalk.blue(message))
    }
  })
