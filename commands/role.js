import * as Sentry from '@sentry/node';
import { SlashCommandBuilder } from '@discordjs/builders';
import { client } from 'archon/Client';

export const command = {
  data: new SlashCommandBuilder()
    .setName('cargos')
    .setDescription('Adiciona ou remove cargos')
    .addStringOption(option =>
      option.setName('cargo')
        .setDescription('Nome do cargo')
        .setRequired(true)
        .addChoices(client.roleChoices)
    ),
  async execute (interaction) {
    try {
      const member = interaction.member;
      const role = interaction.options.getString('cargo');

      if (member.roles.cache.has(role)) {
        await member.roles.remove(role);
        await interaction.reply({ content: 'Cargo removido com sucesso!', ephemeral: true });
      } else if (!member.roles.cache.has(role)) {
        await member.roles.add(role);
        await interaction.reply({ content: 'Cargo adicionado com sucesso!', ephemeral: true });
      }
    } catch (error) {
      console.error(error);
      Sentry.withScope(scope => {
        scope.setTags({
          command: 'convite',
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
