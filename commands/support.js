import * as Sentry from '@sentry/node';
import { MessageEmbed } from 'discord.js';
import { SlashCommandBuilder } from '@discordjs/builders';

export const command = {
  data: new SlashCommandBuilder()
    .setName('suporte')
    .setDescription('Informações pertinentes para um pedido de suporte'),
  async execute (interaction) {
    try {
      const messageEmbed = new MessageEmbed()
        .setColor('#ff6400')
        .setTitle('Como pedir suporte')
        .setDescription('Ao pedir suporte procure sempre fornecer o máximo de informações possíveis. Perguntas do tipo "***O módulo X não funciona, como resolvo?***" só vão fazer com que boa parte das pessoas dispostas a ajudar ignorem o seu problema ou façam diversas perguntas tentando entender seu problema, o que vai causar confusão e atrapalhar ainda mais. As informações citadas abaixo **não são obrigatórias**, mas quanto mais informações você proporcionar melhor. Poste sempre no canal adequado, o de <#714458438742179850>')
        .addFields(
          { name: 'Versão do Foundry', value: 'A versão do Foundry que você está utilizando, procure sempre utilizar as versões estáveis mais recentes.' },
          { name: 'Versão do sistema', value: 'Informe a versão e o nome do sistema em que o problema está aparecendo.' },
          { name: 'Módulos ativos', value: 'A lista de todos os módulos que se encontram ativos, sempre que tiver um problema o primeiro passo é desativar todos os módulos e testar se o problema persiste.' },
          { name: 'Sistema operacional e navegador', value: 'Informe qual o seu sistema operacional e a versão, o navegador e a versão dele também são muito importantes, se estiver utilizando diretamente o programa ao invés do navegador informe.' },
          { name: 'Passos para reproduzir', value: 'Informe o que você fez e em que ordem, isso ajuda a tentar reproduzir o erro e facilita no suporte.' },
          { name: 'Capturas de tela', value: 'Faça screenshots ou vídeos do erro e poste os mesmos junto ao seu problema.' },
          { name: 'Erros no console', value: 'Pressione a tecla `F12` e informe todo e quaisquer erros que estejam sendo listados.' }
        )
        .setThumbnail(interaction.guild.iconURL({ dynamic: true, size: 56 }));

      await interaction.reply({ embeds: [messageEmbed] });
    } catch (error) {
      console.error(error);
      Sentry.withScope(scope => {
        scope.setTags({
          command: 'suporte',
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
