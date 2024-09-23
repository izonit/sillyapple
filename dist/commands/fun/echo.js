"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EchoCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
class EchoCommand extends framework_1.Command {
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
        const embed = new discord_js_1.EmbedBuilder()
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
exports.EchoCommand = EchoCommand;
