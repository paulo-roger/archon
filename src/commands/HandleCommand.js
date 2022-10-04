/**
 * Handle an incoming message command.
 * @param {Interaction} message - Represents a Discord message.
 * @param {Collection} commandsCollection - Discord.js Collection containing the commands.
 * @param {string} [prefix] - Prefix used to define if a message is a command.
 */
export async function handleCommand (message, commandsCollection, prefix = process.env.PREFIX) {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = commandsCollection.get(commandName) || commandsCollection.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  if (command.guildOnly && message.channel.type === 'dm') {
    return message.reply('Esse comando não pode ser usado fora de servidores!');
  }

  try {
    command.execute(message, args);
  } catch (error) {
    console.error(error);
    message.reply('Não foi possível executar esse comando!');
  }
}
