import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';

/**
 * Register commands for a specific guild thought Discord API.
 * @param {string} clientId - Specify which application to authorize.
 * @param {string} guildId - Specify on which guild to register the commands.
 * @param {Array} commands - Array containing the commands that should be registered.
 * @param {string} [discordToken] - Discord token that should be used to authorize the request.
 */
export async function registerGuildCommands (clientId, guildId, commands, discordToken = process.env.DISCORD_TOKEN) {
  const rest = new REST({ version: '9' }).setToken(discordToken);

  try {
    console.log('Started registering guild slash commands.');

    await rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands });

    console.log(`Successfully registered ${commands.length} guild commands.`);
  } catch (error) {
    console.error(error);
  }
}
