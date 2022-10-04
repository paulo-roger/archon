import { readFileSync } from 'fs';

export const DISCORD_TOKEN = process.env.DISCORD_TOKEN;
export const ENVIRONMENT = process.env.NODE_ENV;
export const GUILD_ID = process.env.GUILD_ID;
export const SENTRY_DSN = process.env.SENTRY_DSN;
export const VERSION = JSON.parse(readFileSync(`${process.cwd()}/package.json`)).version;
