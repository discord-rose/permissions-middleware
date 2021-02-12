import { bits } from 'discord-rose/dist/utils/Permissions'

declare module 'discord-rose' {
  namespace DiscordRose {
    export interface CommandOptions {
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
}