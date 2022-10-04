/**
 * Handle an incoming slash command.
 * @param {Interaction} interaction - Represents an interaction.
 * @param {Collection} commandsCollection - Discord.js Collection containing the commands.
 */
export async function handleInteraction (interaction, commandsCollection) {
  if (!interaction.isCommand() && !interaction.isContextMenu()) return;

  const command = commandsCollection.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'Não foi possível executar esse comando!', ephemeral: true });
  }
}
