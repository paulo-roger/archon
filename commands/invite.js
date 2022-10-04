import * as Sentry from '@sentry/node';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command = {
  data: new SlashCommandBuilder()
    .setName('convite')
    .setDescription('Link de convite do servidor'),
  async execute (interaction) {
    try {
      const guild = await interaction.guild.fetch();
      const invites = await guild.invites.fetch();
      const inviteLink = invites.filter(invite => invite?.maxAge === 0).first();
      await interaction.reply(`O link de convite do servidor é ${inviteLink}`);
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
