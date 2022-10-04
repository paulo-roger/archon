import { client } from 'archon/Client';

export async function setPermissions (guildId, commandList, roleName = 'Administrador') {
  const guild = await client.guilds.fetch(guildId);
  const guildCommands = await guild.commands.fetch();
  const administratorRole = guild.roles.cache.find(role => role.name === roleName);
  const permissions = [
    {
      id: administratorRole.id,
      type: 'ROLE',
      permission: true
    }
  ];
  guildCommands.filter(command => commandList.includes(command.name)).forEach(async command => await command.permissions.add({ permissions }));
}
