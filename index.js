module.exports = ({
  user = (ctx) => `You're the following permissions: ${ctx.command.userPerms.join(', ')}`,
  my = (ctx) => `I'm missing the following permissions: ${ctx.command.myPerms.join(', ')}`
} = {}) => {
  return (ctx) => {
    if (ctx.command.userPerms && !ctx.command.userPerms.every(x => ctx.hasPerms(x))) {
      throw new Error(user(ctx))
    }
    if (ctx.command.myPerms && !ctx.command.myPerms.every(x => ctx.myPerms(x))) {
      throw new Error(my(ctx))
    }

    return true
  }
}
