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




## Creating a custom message

When using `permissionsMiddleware()` you can pass a custom message object with a function, that takes a function which takes the command context:
```js
{
  user: (ctx, perms) => ...,//
  my: (ctx, perms) => ... //
}
```

By default it is 
```js
{
  my = (_ctx, perms) => `I am missing the following permissions: ${perms.map(p => humanReadable[p] ?? p).join(', ')}`,
  user = (_ctx, perms) => `You are missing the following permissions: ${perms.map(p => humanReadable[p] ?? p).join(', ')}`,
}
```
This will result in a message like: "I am missing the following permissions: Embed Links, Add Reactions" or "You are missing the following permissions: Manage Messages"
This will only show the permissions that are missing and not all the required permissions for the command. To show all the permissions the command uses [this](#using-the-default-readable-permissions) setup would show all the perms.

#### Example for creating a custom message:

```js
worker.commands
  .middleware(permissionsMiddleware({
    user: (ctx, perms) => "You don't have permissions"
  }))
```



## Using the default readable permissions

Creating custom messages but using the provided readable permissions:
```js
permissionsMiddleware({
  user: (ctx, perms) => `You don't have the required permissions you need: ${ctx.command.userPerms.map(p => permissionsMiddleware.humanReadable[p])}`,
  my: (ctx, perms) => `You don't have the required permissions you need: ${ctx.command.myPerms.map(p => permissionsMiddleware.humanReadable[p])}`
})
```

This will also list all of the permissions required by the command. The `perms` parameter only lists the permissions that are missing.

#### Using Typescript

To import humanReadable in Typescript you need to import permissionsMiddleware as follows:

```typescript
import permissionsMiddleware, { humanReadable } from '@discord-rose/permissions-middleware'
```





## Default readable permissions

[Can be viewed here.](./permissions-middleware/blob/master/index.js#L1)

