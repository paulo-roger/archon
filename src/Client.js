import { Client, Intents } from 'discord.js';
import { DISCORD_TOKEN } from 'archon/Config';

export const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES] });
client.login(DISCORD_TOKEN);
