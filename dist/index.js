"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.client = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
require("@sapphire/plugin-logger/register"); // ~ Logger
const dotenv = require("dotenv");
dotenv.config();
exports.client = new framework_1.SapphireClient({
    intents: [
        discord_js_1.GatewayIntentBits.Guilds,
        discord_js_1.GatewayIntentBits.GuildMessages,
        discord_js_1.GatewayIntentBits.GuildMembers,
        discord_js_1.GatewayIntentBits.MessageContent,
        discord_js_1.GatewayIntentBits.DirectMessages,
        discord_js_1.GatewayIntentBits.GuildModeration
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
        level: framework_1.LogLevel.Debug
    },
    loadMessageCommandListeners: true,
    defaultPrefix: process.env.DEFAULT_PREFIX,
});
framework_1.ApplicationCommandRegistries.setDefaultGuildIds(['1051056884335001620']);
exports.client.login(process.env.TOKEN);
