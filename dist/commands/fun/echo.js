import { Command } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';
export class EchoCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
        });
    }
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder //
                .setName('echo')
                .setDescription('Echoes your message')
                .addStringOption((option) => option //
                .setName('text')
                .setDescription('The text to say')
                .setRequired(true));
        });
    }
    async chatInputRun(interaction) {
        const embed = new EmbedBuilder()
            .setTitle('Anonymous message')
            .setDescription(`${interaction.options.getString('text', true)}`)
            .setTimestamp();
        await interaction.reply({
            content: 'Message succesfully sent.',
            ephemeral: true,
        });
        await interaction.channel?.send({ embeds: [embed] });
    }
}
