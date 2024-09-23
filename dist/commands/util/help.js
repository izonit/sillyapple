import { Command } from '@sapphire/framework';
import { helpEmbed } from '../../lib/helpEmbed';
export class HelpCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'help',
            description: 'Get help about the bot',
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('help')
                .setDescription('Get help about the bot');
        });
    }
    async chatInputRun(interaction) {
        interaction.reply({ embeds: [helpEmbed] });
    }
    // & Message command down below
    async messageRun(message) {
        message.reply({ embeds: [helpEmbed] });
    }
}
