import { MessageEmbed } from 'discord.js';

export function movedEmbed (interaction, message, color = '#03A9F4') {
  const messageEmbed = new MessageEmbed()
    .setColor(color)
    .setAuthor(message.author.tag, message.author.avatarURL({ dynamic: true }))
    .setTitle('Mensagem movida:')
    .setDescription(message.content)
    .addField('Mensagem original postada em:', `<#${interaction.channelId}> por ${message.author}`, false);

  const finalMessage = { embeds: [messageEmbed] };

  if (message.attachments.size === 1) {
    messageEmbed.setImage(message.attachments.first().url);
  }

  if (message.attachments.size > 1) {
    finalMessage.files = message.attachments;
  }

  return finalMessage;
}
