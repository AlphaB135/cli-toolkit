##############################################################################
# Init Command
##############################################################################

import { Command } from 'commander'
import chalk from 'chalk'
import ora from 'ora'
import path from 'path'
import fs from 'fs/promises'
import { existsSync } from 'fs'
import { InitOptions } from '../types/index.js'

export const initCommand = new Command('init')
  .description('Initialize a new project')
  .option('-f, --force', 'Overwrite existing files', false)
  .action(async (options: InitOptions) => {
    console.log()
    console.log(chalk.bold.blue('Welcome to CLI Toolkit!'))
    console.log(chalk.gray('Let\'s set up your project...\n'))

    const spinner = ora('Creating project structure...').start()

    try {
      # Create project structure
      const files = [
        'config',
        'src',
        'tests',
        '.env',
        '.gitignore',
        'README.md'
      ]

      for (const file of files) {
        const filePath = path.join(process.cwd(), file)

        if (existsSync(filePath) && !options.force) {
          spinner.warn(`Skipped ${file} (already exists)`)
          continue
        }

        if (file.startsWith('.')) {
          await fs.writeFile(filePath, '', 'utf-8')
        } else {
          await fs.mkdir(filePath, { recursive: true })
        }
      }

      # Create config file
      const configPath = path.join(process.cwd(), 'config', 'config.json')
      await fs.writeFile(
        configPath,
        JSON.stringify({ apiKey: '', apiUrl: 'https://api.example.com' }, null, 2),
        'utf-8'
      )

      spinner.succeed('Project structure created!')

      console.log()
      console.log(chalk.green('✓ Project initialized successfully'))
      console.log(chalk.gray('  Run ' + chalk.bold('mycli hello') + ' to test your CLI'))
      console.log()

    } catch (error) {
      spinner.fail('Failed to initialize project')
      console.error(chalk.red(error instanceof Error ? error.message : String(error)))
      process.exit(1)
    }
  })
