import { client } from 'archmage/Client';

export async function getChannels (guildId = process.env.GUILD_ID) {
  const guild = await client.guilds.fetch(guildId);
  const channels = await guild.channels.fetch();

  return channels;
}
