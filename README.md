# CLI Toolkit Template

A production-ready Node.js CLI template with TypeScript, testing, and best practices built-in.

## Features

- **TypeScript** - Fully typed for better developer experience
- **Commander.js** - Powerful CLI framework
- **Chalk** - Beautiful terminal colors
- **Ora** - Elegant terminal spinners
- **Inquirer** - Interactive prompts
- **Config Management** - Persistent configuration with conf
- **Testing** - Vitest for unit testing
- **Linting** - ESLint and Prettier configured
- **Auto-updates** - Notifier for new versions

## Installation

```bash
npm install -g @alphaseed/cli-toolkit
```

## Quick Start

```bash
# Initialize a new project
mycli init

# Say hello
mycli hello --name "World"

# Manage configuration
mycli config set apiKey=your-key
mycli config list
```

## Commands

### hello
Say hello to someone.

```bash
mycli hello [options]

Options:
  -n, --name <name>  Name to greet (default: "World")
  -s, --shout        Shout the greeting
```

### init
Initialize a new project.

```bash
mycli init [options]

Options:
  -f, --force  Overwrite existing files
```

### config
Manage configuration.

```bash
mycli config [options]

Options:
  -s, --set <key=value>   Set a config value
  -g, --get <key>          Get a config value
  -l, --list              List all config values
  -d, --delete <key>      Delete a config value
```

## Development

```bash
# Clone the repository
git clone https://github.com/AlphaB135/cli-toolkit.git
cd cli-toolkit

# Install dependencies
npm install

# Run in development mode
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Lint code
npm run lint

# Format code
npm run format
```

## Project Structure

```
cli-toolkit/
├── src/
│   ├── commands/       # CLI commands
│   │   ├── hello.ts
│   │   ├── init.ts
│   │   └── config.ts
│   ├── types/         # TypeScript definitions
│   │   └── index.ts
│   ├── utils/         # Utility functions
│   └── cli.ts        # Main entry point
├── tests/             # Test files
├── dist/              # Compiled output
├── package.json
├── tsconfig.json
└── README.md
```

## Adding New Commands

1. Create a new file in `src/commands/`:

```typescript
import { Command } from 'commander'
import chalk from 'chalk'

export const myCommand = new Command('my-command')
  .description('My command description')
  .option('-o, --option <value>', 'Option description')
  .action(async (options) => {
    console.log(chalk.blue('Running my command!'))
    // Your logic here
  })
```

2. Import and add to the CLI program in `src/cli.ts`:

```typescript
import { myCommand } from './commands/my-command.js'

program.addCommand(myCommand)
```

## Configuration

Configuration is stored in:
- **macOS**: `~/Library/Preferences/cli-toolkit/config.json`
- **Windows**: `%APPDATA%\cli-toolkit\Config\config.json`
- **Linux**: `~/.config/cli-toolkit/config.json`

## License

MIT

## Author

αB - [GitHub](https://github.com/AlphaB135)
