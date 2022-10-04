import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

/**
 * Register commands globally thought Discord API.
 * @param {string} clientId - Specify which application to authorize.
 * @param {Array} commands - Array containing the commands that should be registered.
 * @param {string} [discordToken] - Discord token that should be used to authorize the request.
 */
export async function registerGlobalCommands (clientId, commands, discordToken = process.env.DISCORD_TOKEN) {
  const rest = new REST({ version: '9' }).setToken(discordToken);

  try {
    console.log('Started registering slash commands.');

    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log(`Successfully registered ${commands.length} commands.`);
  } catch (error) {
    console.error(error);
  }
}
