import * as Sentry from '@sentry/node';
import { client } from 'archon/Client';
import { ENVIRONMENT, GUILD_ID, SENTRY_DSN, VERSION } from 'archon/Config';
import { handleInteraction, loadCommands, registerGuildCommands } from 'archon/Commands';
import { getChannels, getRoleChoices, setPermissions } from 'archon/Utils';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: ENVIRONMENT,
  release: VERSION
});

client.once('ready', async () => {
  try {
    client.roleChoices = await getRoleChoices();
    client.commands = await loadCommands();
    await registerGuildCommands(client.user.id, GUILD_ID, client.commands.list);
    await setPermissions(GUILD_ID, ['Mover para suporte', 'mover']);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
});

client.on('interactionCreate', async interaction => {
  try {
    await handleInteraction(interaction, client.commands.collection);
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
});

client.on('guildMemberAdd', async member => {
  try {
    if (member.guild.id === GUILD_ID) {
      const channels = await getChannels();

      const welcomeChannel = channels.find(channel => channel.name === 'bem-vindo');
      const rulesChannel = channels.find(channel => channel.name === 'regras');
      const supportChannel = channels.find(channel => channel.name === 'suporte');
      const offTopicChannel = channels.find(channel => channel.name === 'bate-papo');

      await welcomeChannel.send(`Olá, ${member.user}! Por favor leia com atenção as <#${rulesChannel.id}> do servidor, se precisar de ajuda com questões relacionadas ao Foundry o canal <#${supportChannel.id}> é o lugar perfeito para fazer suas perguntas, se o assunto não for relacionado ao Foundry ou estiver em dúvida sobre onde postar use o canal <#${offTopicChannel.id}>. Use o comando \`/cargos\` para receber notificações de assuntos do seu interesse e para liberar a postagem de links e imagens.`);
    }
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
});

client.on('guildMemberRemove', async member => {
  try {
    if (member.guild.id === GUILD_ID) {
      const channels = await getChannels();
      const welcomeChannel = channels.find(channel => channel.name === 'bem-vindo');
      await welcomeChannel.send(`Uma pena te ver partir, ${member.user}. Volte sempre!`);
    }
  } catch (error) {
    console.error(error);
    Sentry.captureException(error);
  }
});
