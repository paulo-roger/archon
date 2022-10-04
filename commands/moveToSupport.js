import * as Sentry from '@sentry/node';
import { ContextMenuCommandBuilder } from '@discordjs/builders';
import { movedEmbed } from 'archmage/Utils';

export const command = {
  data: new ContextMenuCommandBuilder()
    .setDefaultPermission(false)
    .setName('Mover para suporte')
    .setType(3),
  async execute (interaction) {
    try {
      const guild = await interaction.guild.fetch();
      const supportChannel = guild.channels.cache.find(channel => channel.name === 'suporte');
      const message = interaction.options.getMessage('message');
      const messageContent = movedEmbed(interaction, message);

      supportChannel.send(messageContent);
      await interaction.reply(`${message.author} a sua mensagem foi movida para o canal <#${supportChannel.id}>`);
    } catch (error) {
      console.error(error);
      Sentry.withScope(scope => {
        scope.setTags({
          command: 'mover para suporte',
          channel: interaction.channel.name
        });
        scope.setUser({
          id: interaction.member.id,
          username: interaction.member.nickname
        });
        Sentry.captureException(error);
      });
    }
  }
};
