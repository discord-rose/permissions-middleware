# Permission Middleware

Permission middleware for [discord-rose](https://npmjs.com/package/discord-rose)

## Install

`npm i @discord-rose/permissions-middleware`

## Usage

Setting CommandOptions`.userPerms` or CommandOptions`.myPerms` will enforce these permissions to be had for the respected member, before running the command

All permissions are typed [here](https://github.com/discord-rose/discord-rose/blob/master/src/utils/Permissions.ts#L5). Both `.myPerms` and `.userPerms` are arrays of these permission keys.

Example:

```js
const permissionsMiddleware = require('@discord-rose/permissions-middleware')

worker.commands
  .middleware(permissionsMiddleware())
  .add({
    userPerms: ['administrator'] // requires the user to have administrator
    command: '!hello',
    exec: (ctx) => {
      ctx.reply('World!')
    }
  })
  .add({ // a good usage is to avoid API errors, for example, deleting messages:
    myPerms: ['manageMessages'], // this will require the manage messages permission
    command: '!delete',
    exec: (ctx) => {
      ctx.delete() // requires manageMessages
    }
  })
```

## Using discord-rose's error logging

When using `permissionsMiddleware()` by default it will send the error as a  rose error message to the user. If you want to have the handler send the message in plain text you and add the following:
```js
permissionsMiddleware({
  sendAsRoseError: false
})
```
- **Note:** If the permission "embed" is required and fails it will send as plain text. (this is a limitation of how rose sends errors)

This will work with any custom messages you set.

## Replying to the original message

If you are using the the plain text response ([sendAsRoseError: false](#using-discord-roses-error-logging "sendAsRoseError = false")) you can have the reponse reply to the executors message:
```js
permsissionsMiddleare({
  makeResponseAReply: true
})
```
## Custom message

When using `permissionsMiddleware()` you can pass a custom message object with a function, that takes a function which takes the command context:
```js
{
  user: (ctx) => ...,//
  my: (ctx) => ... //
}
```

By default it is 
```js
{
  my = (ctx) => `I am missing the following permissions: \`${ctx.command.myPerms.filter(p => !ctx.myPerms(p)).map(p => (typeof humanReadable === 'function' ? humanReadable(ctx, p) : humanReadable[p]) || p).join('`, `')}\``,
  user = (ctx) => `You are missing the following permissions: \`${ctx.command.userPerms.filter(p => !ctx.userPerms(p)).map(p => (typeof humanReadable === 'function' ? humanReadable(ctx, p) : humanReadable[p]) || p).join('`, `')}\``
}
```
This will result in a message like: "I am missing the following permissions: `Embed Links`" or "You are missing the following permissions: `Manage Messages`"
This will only show the permissions that are missing and not all the required permissions for the command. To show all the permissions the command uses [this](#using-the-default-readable-permissions) setup would show all the perms.


Example for creating a custom message:

```js
worker.commands
  .middleware(permissionsMiddleware({
    user: (ctx) => "You don't have permissions"
  }))
```
## Using the default readable permissions
Creating custom messages but using the provided readable permissions:
```js
permissionsMiddleware({
  user: (ctx) => `You don't have the required permissions you need: ${ctx.command.userPerms.map(p => permissionsMiddleware.humanReadable[p])}`
})
```

## Default readable permisisons
```json
{
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
```
[1]: #custom