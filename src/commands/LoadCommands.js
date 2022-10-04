import { Collection } from 'discord.js';
import { readdirSync } from 'fs';

/**
 * Load command files to be later used.
 * @param {string} [directory] - Directory containing the command files.
 * @param {string} [fileExt] - File extension that should be loaded.
 * @returns {Promise.<object>} Resolves to an object containing an array and a collection of the commands.
 */
export async function loadCommands (directory = `${process.cwd()}/commands`, fileExt = '.js') {
  try {
    const commandFiles = readdirSync(directory).filter(file => file.endsWith(fileExt));
    const commands = {
      list: [],
      collection: new Collection()
    };

    for (const file of commandFiles) {
      const { command } = await import(`${directory}/${file}`);
      commands.list.push(command.data.toJSON());
      commands.collection.set(command.data.name, command);
    }

    return commands;
  } catch (error) {
    console.error(error);
  }
}
