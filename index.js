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
  humanReadable = humanReadable,
  my = (ctx) => `I am missing the following permissions: \`${ctx.command.myPerms.filter(p => !ctx.myPerms(p)).map(p => (typeof humanReadable === 'function' ? humanReadable(ctx, p) : humanReadable[p]) || p).join('`, `')}\``,
  user = (ctx) => `You are missing the following permissions: \`${ctx.command.userPerms.filter(p => !ctx.userPerms(p)).map(p => (typeof humanReadable === 'function' ? humanReadable(ctx, p) : humanReadable[p]) || p).join('`, `')}\``,
  sendAsRoseError = true,
  makeResponseAReply = false
} = {}) => {
  return (ctx) => {
      if (ctx.command.hasOwnProperty('myPerms') && !ctx.command.myPerms.every(x => ctx.myPerms(x))) {
          if (sendAsRoseError && ctx.myPerms('embed')) throw new Error(my(ctx))
          makeResponseAReply ? ctx.reply(my(ctx)) : ctx.send(my(ctx))
          return false
      }
      if (ctx.command.hasOwnProperty('userPerms') && !ctx.command.userPerms.every(x => ctx.hasPerms(x))) {
          if (sendAsRoseError) throw new Error(user(ctx))
          makeResponseAReply ? ctx.reply(user(ctx)) : ctx.send(user(ctx))
          return false
      }
      return true
  }
}

exportFunc.humanReadable = humanReadable