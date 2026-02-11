##############################################################################
# Config Command
##############################################################################

import { Command } from 'commander'
import chalk from 'chalk'
import Conf from 'conf'
import { ConfigOptions } from '../types/index.js'

const config = new Conf({
  projectName: 'cli-toolkit',
  projectVersion: '1.0.0'
})

export const configCommand = new Command('config')
  .description('Manage configuration')
  .option('-s, --set <key=value>', 'Set a config value')
  .option('-g, --get <key>', 'Get a config value')
  .option('-l, --list', 'List all config values')
  .option('-d, --delete <key>', 'Delete a config value')
  .action((options: ConfigOptions) => {
    if (options.set) {
      const [key, ...valueParts] = options.set.split('=')
      const value = valueParts.join('=')

      if (!key || value === undefined) {
        console.error(chalk.red('Error: Invalid format. Use: --set key=value'))
        process.exit(1)
      }

      config.set(key, value)
      console.log(chalk.green(`✓ Set ${key} = ${value}`))
    }

    if (options.get) {
      const value = config.get(options.get)
      if (value === undefined) {
        console.error(chalk.red(`Error: Config key "${options.get}" not found`))
        process.exit(1)
      }
      console.log(chalk.blue(`${options.get} = ${value}`))
    }

    if (options.list) {
      const all = config.store
      console.log(chalk.bold('\nConfiguration:'))
      for (const [key, value] of Object.entries(all)) {
        console.log(`  ${chalk.cyan(key)}: ${value}`)
      }
      console.log()
    }

    if (options.delete) {
      if (!config.has(options.delete)) {
        console.error(chalk.red(`Error: Config key "${options.delete}" not found`))
        process.exit(1)
      }
      config.delete(options.delete)
      console.log(chalk.green(`✓ Deleted ${options.delete}`))
    }

    # If no options provided, show list
    if (!options.set && !options.get && !options.list && !options.delete) {
      const all = config.store
      console.log(chalk.bold('\nConfiguration:'))
      for (const [key, value] of Object.entries(all)) {
        console.log(`  ${chalk.cyan(key)}: ${value}`)
      }
      console.log()
    }
  })
