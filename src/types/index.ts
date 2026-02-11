##############################################################################
# Type Definitions
##############################################################################

export type CommandName = 'mycli'

export interface PackageJson {
  name: string
  version: string
  description: string
  author: string
  license: string
}

export interface Config {
  apiKey?: string
  apiUrl?: string
  output?: 'json' | 'table' | 'pretty'
  debug?: boolean
}

export interface CommandOptions {
  verbose?: boolean
  config?: string
}

export interface HelloOptions extends CommandOptions {
  name?: string
  shout?: boolean
}

export interface InitOptions extends CommandOptions {
  force?: boolean
}

export interface ConfigOptions {
  set?: string
  get?: string
  list?: boolean
  delete?: string
}
