import { SapphireClient, ApplicationCommandRegistries, LogLevel } from '@sapphire/framework';
import { GatewayIntentBits } from 'discord.js';
import { token, defaultPrefix } from '../config.json';
import '@sapphire/plugin-logger/register'; // ~ Logger
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
        activities: [
            {
                name: 'yapping',
                type: 2
            },
        ],
        status: 'idle',
    },
    logger: {
        level: LogLevel.Debug
    },
    loadMessageCommandListeners: true,
    defaultPrefix: defaultPrefix,
});
ApplicationCommandRegistries.setDefaultGuildIds(['1051056884335001620']);
client.login(token);
