"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PingCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
const discord_js_1 = require("discord.js");
const constants_1 = require("../../lib/constants");
const emojis_json_1 = require("../../lib/emojis.json");
class PingCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'ping',
            description: 'Ping-pong',
            aliases: ['pong', 'Ping']
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('ping')
                .setDescription('Ping-pong');
        });
    }
    async chatInputRun(interaction) {
        const msg = await interaction.reply({
            content: `${emojis_json_1.emojis.loading} ${constants_1.RandomLoadingMessage[Math.floor(Math.random() * constants_1.RandomLoadingMessage.length)]}`,
            fetchReply: true
        });
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`**Latency**: ${msg.createdTimestamp - interaction.createdTimestamp}ms\n**API Latency**: ${Math.round(this.container.client.ws.ping)}ms.\n**Round trip took:** ${msg.createdTimestamp - interaction.createdTimestamp + this.container.client.ws.ping}ms`)
            .setColor('Green')
            .setTimestamp();
        if ((0, discord_js_utilities_1.isMessageInstance)(msg)) {
            return interaction.editReply({
                content: ``,
                embeds: [embed]
            });
        }
    }
    // & Chat command down below
    async messageRun(message) {
        const msg = await message.reply({
            content: `${emojis_json_1.emojis.loading} ${constants_1.RandomLoadingMessage[Math.floor(Math.random() * constants_1.RandomLoadingMessage.length)]}`,
        });
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`**Latency**: ${msg.createdTimestamp - message.createdTimestamp}ms\n**API Latency**: ${Math.round(this.container.client.ws.ping)}ms.\n**Round trip took:** ${msg.createdTimestamp - message.createdTimestamp + this.container.client.ws.ping}ms`)
            .setColor('Green')
            .setTimestamp();
        return msg.edit({
            content: ``,
            embeds: [embed]
        });
    }
}
exports.PingCommand = PingCommand;
