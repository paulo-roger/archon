import * as Sentry from '@sentry/node';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command = {
  data: new SlashCommandBuilder()
    .setName('webgl')
    .setDescription('Como ativar a aceleração de hardware'),
  async execute (interaction) {
    try {
      const messageEmbed = new MessageEmbed()
        .setColor('#ff6400')
        .setTitle('Ativando  a aceleração de hardware')
        .setDescription('Se você se deparar com erros de WebGL, telas pretas ou cinzas, problemas de performance ou cenas que não carregam siga os passos abaixo.')
        .addFields(
          { name: 'Chrome, Chromium, Edge e similares', value: '**1.** Na barra de endereços abra `chrome://settings`, ative a opção `Use Hardware Acceleration When Available`.\n**2.** Visite `chrome://flags`, ative a opção `Override Software Rendering List`.\n**3.** Feche e abra novamente o navegador.' },
          { name: 'Firefox', value: '**1.** Na barra de endereços abra `about:config`, mude a opção `layers.acceleration.force-enabled` para `true`.\n**2.** Feche e abra novamente o navegador.' }
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 56 }));

      await interaction.reply({ embeds: [messageEmbed] });
    } catch (error) {
      console.error(error);
      Sentry.withScope(scope => {
        scope.setTags({
          command: 'webgl',
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
