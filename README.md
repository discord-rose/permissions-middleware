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
  user = (ctx) => `You're the following permissions: ${ctx.command.userPerms.join(', ')}`,
  my = (ctx) => `I'm missing the following permissions: ${ctx.command.myPerms.join(', ')}`
}
```

Example for creating a custom message:

```js
worker.commands
  .middleware(permissionsMiddleware({
    user: (ctx) => "You don't have permissions"
  }))
```