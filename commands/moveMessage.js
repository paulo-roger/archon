import * as Sentry from '@sentry/node';
import { SlashCommandBuilder } from '@discordjs/builders';
import { movedEmbed } from 'archon/Utils';

export const command = {
  data: new SlashCommandBuilder()
    .setDefaultPermission(false)
    .setName('mover')
    .setDescription('Mover mensagem para outro canal')
    .addStringOption(option =>
      option.setName('id')
        .setDescription('Id da mensagem')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option.setName('canal')
        .setDescription('Para qual canal mover a mensagem')
        .setRequired(true)
    ),
  async execute (interaction) {
    try {
      const message = await interaction.channel.messages.fetch(interaction.options.getString('id'));
      const channel = interaction.options.getChannel('canal');
      const messageContent = movedEmbed(interaction, message);

      if (channel.isText()) {
        channel.send(messageContent);
        await interaction.reply(`${message.author} a sua mensagem foi movida para o canal <#${channel.id}>`);
      }
    } catch (error) {
      console.error(error);
      Sentry.withScope(scope => {
        scope.setTags({
          command: 'mover',
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
