import { bits } from 'discord-rose/dist/utils/Permissions'
import { CommandContext } from "discord-rose/dist/structures/CommandContext";

declare module 'discord-rose/dist/typings/lib' {
  interface CommandOptions {
    /**
     * Whether or not the executing user has said permissions
     */
    userPerms?: (keyof typeof bits)[]
    /**
     * Whether or not the bot has said permissions
     */
    myPerms?: (keyof typeof bits)[]
  }
}

type msgFunction = (ctx: CommandContext) => string

declare const _default: (msgs?: {
  my: msgFunction,
  user: msgFunction
}) => (ctx: CommandContext) => boolean

export default _default