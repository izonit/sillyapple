import { Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { EmbedBuilder } from 'discord.js';
import { RandomLoadingMessage } from '../../lib/constants';
import { emojis } from '../../lib/emojis.json';
export class PingCommand extends Command {
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
            content: `${emojis.loading} ${RandomLoadingMessage[Math.floor(Math.random() * RandomLoadingMessage.length)]}`,
            fetchReply: true
        });
        const embed = new EmbedBuilder()
            .setTitle('Pong!')
            .setDescription(`**Latency**: ${msg.createdTimestamp - interaction.createdTimestamp}ms\n**API Latency**: ${Math.round(this.container.client.ws.ping)}ms.\n**Round trip took:** ${msg.createdTimestamp - interaction.createdTimestamp + this.container.client.ws.ping}ms`)
            .setColor('Green')
            .setTimestamp();
        if (isMessageInstance(msg)) {
            return interaction.editReply({
                content: ``,
                embeds: [embed]
            });
        }
    }
    // & Chat command down below
    async messageRun(message) {
        const msg = await message.reply({
            content: `${emojis.loading} ${RandomLoadingMessage[Math.floor(Math.random() * RandomLoadingMessage.length)]}`,
        });
        const embed = new EmbedBuilder()
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
