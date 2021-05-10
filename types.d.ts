import { PermissionsUtils } from 'discord-rose'
import { CommandContext } from "discord-rose/dist/typings/lib"

type bitKey = (keyof typeof PermissionsUtils.bits)[]

declare module 'discord-rose/dist/typings/lib' {
  interface CommandOptions {
    /**
     * Whether or not the executing user has said permissions
     */
    userPerms?: bitKey
    /**
     * Whether or not the bot has said permissions
     */
    myPerms?: bitKey
  }
}

type humanReadableBits = {
  [key in bitKey[number]]?: string
}

type msgFunction = (ctx: CommandContext, perms: bitKey) => Promise<string> | string

declare const _default: (opts?: {
  /**
   * Message that returns if bot requires permissions
   */
  my?: msgFunction,
  /**
   * Message that returns if user requrires permissions
   */
  user?: msgFunction
}) => (ctx: CommandContext) => boolean

export default _default

/**
 * A JSON of the default provided bits
 */
export const humanReadable: humanReadableBits
