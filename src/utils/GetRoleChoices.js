import { client } from 'archmage/Client';

export async function getRoleChoices (guildId = process.env.GUILD_ID) {
  const roleChoices = [];
  const guild = await client.guilds.fetch(guildId);
  guild.roles.cache.filter(role => role.name[0] !== role.name[0].toUpperCase()).forEach(role => roleChoices.push([role.name, role.id]));
  return roleChoices;
}
