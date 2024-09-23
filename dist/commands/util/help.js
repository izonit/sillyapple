"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const framework_1 = require("@sapphire/framework");
const helpEmbed_1 = require("../../lib/helpEmbed");
const dotenv = require("dotenv");
dotenv.config();
class HelpCommand extends framework_1.Command {
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
        interaction.reply({ embeds: [helpEmbed_1.helpEmbed] });
    }
    // & Message command down below
    async messageRun(message) {
        message.reply({ embeds: [helpEmbed_1.helpEmbed] });
    }
}
exports.HelpCommand = HelpCommand;
