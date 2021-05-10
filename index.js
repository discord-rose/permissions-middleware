const humanReadable = {
  createInvites: 'Create Invites',
  kick: 'Kick Members',
  ban: 'Ban Members',
  administrator: 'Administrator',
  manageChannels: 'Manage Channels',
  manageGuild: 'Manage Server',
  addReactions: 'Add Reactions',
  auditLog: 'View Audit Log',
  prioritySpeaker: 'Priority Speaker',
  stream: 'Stream',
  viewChannel: 'View Channel(s)',
  sendMessages: 'Send Messages',
  tts: 'Send Text-to-Speech Messages',
  manageMessages: 'Manage Messages',
  embed: 'Embed Links',
  files: 'Attach Files',
  readHistory: 'Read Message History',
  mentionEveryone: 'Mention \@everyone, \@here, and All Roles',
  externalEmojis: 'Use External Emoji',
  viewInsights: 'View Server Invites',
  connect: 'Connect (Voice)',
  speak: 'Speak (Voice)',
  mute: 'Mute (Voice)',
  deafen: 'Deafen (Voice)',
  move: 'Move (Voice)',
  useVoiceActivity: 'Use Voice Activity',
  nickname: 'Change Nickname',
  manageNicknames: 'Manage Nicknames',
  manageRoles: 'Manage Roles',
  webhooks: 'Manage Webhooks',
  emojis: 'Manage Emojis'
}

const exportFunc = module.exports = ({
  my = (_ctx, perms) => `I am missing the following permissions: ${perms.map(p => humanReadable[p] ?? p).join(', ')}`,
  user = (_ctx, perms) => `You are missing the following permissions: ${perms.map(p => humanReadable[p] ?? p).join(', ')}`,
} = {}) => {
  return async (ctx) => {
    if (ctx.command.hasOwnProperty('myPerms')) {
      const missingPerms = ctx.command.myPerms.filter(x => !ctx.myPerms(x))
      if (missingPerms.length > 0) {
        return ctx.error(await my(ctx, missingPerms))
      }
    }
    if (ctx.command.hasOwnProperty('userPerms')) {
      const missingPerms = ctx.command.userPerms.filter(x => !ctx.hasPerms(x))
      if (missingPerms.length > 0) {
        return ctx.error(await user(ctx, missingPerms))
      }
    }
    return true
  }
}

exportFunc.humanReadable = humanReadable
