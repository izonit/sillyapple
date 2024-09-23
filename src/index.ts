import { SapphireClient, ApplicationCommandRegistries } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';

dotenv.config()

export const client = new SapphireClient({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.GuildModeration
  ],

  presence: { 
    activities: 
      [
        { 
          name: 'yapping', 
          type: 2 
        },
      ],

    status: 'idle',
  },

  loadMessageCommandListeners: true,
  defaultPrefix: process.env.DEFAULT_PREFIX,
});

ApplicationCommandRegistries.setDefaultGuildIds(['1051056884335001620']);

client.login(process.env.TOKEN);