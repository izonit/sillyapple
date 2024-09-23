"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TickleCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_utilities_1 = require("@sapphire/discord.js-utilities");
class TickleCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'tickle',
            description: 'Tickle someone',
            aliases: ['Tickle', 'tickles'],
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder //
                .setName('tickle')
                .setDescription('Tickle someone')
                .addUserOption(option => option //
                .setName('user')
                .setDescription('The user to tickle')
                .setRequired(true))
                .addStringOption(option => option //
                .setName('item')
                .setDescription('The item to tickle with')
                .setRequired(false));
        });
    }
    async chatInputRun(interaction) {
        const msg = await interaction.reply({
            content: 'Tickling... ',
            fetchReply: true,
        });
        if ((0, discord_js_utilities_1.isMessageInstance)(msg)) {
            if (interaction.options.getString('item')) {
                return interaction.editReply({
                    content: `**${interaction.user.username}** tickled **${interaction.options.getUser('user')?.username ?? 'Unknown user'}** with **${interaction.options.getString('item')}**`,
                });
            }
            else {
                return interaction.editReply({
                    content: `**${interaction.user.username}** tickled **${interaction.options.getUser('user')?.username ?? 'Unknown user'}**`,
                });
            }
        }
    }
    // & Message command down below
    async messageRun(message, args) {
        const user = await args.pick('user');
        const item = await args.finished ? null : await args.pick('string');
        const msg = await message.reply({
            content: 'Tickling... ',
        });
        if ((0, discord_js_utilities_1.isMessageInstance)(msg)) {
            if (item) {
                return msg.edit({
                    content: `**${message.author.username}** tickled **${user.username ?? 'Unknown user'}** with **${item}**`,
                });
            }
            else {
                return msg.edit({
                    content: `**${message.author.username}** tickled **${user.username ?? 'Unknown user'}**`,
                });
            }
        }
    }
}
exports.TickleCommand = TickleCommand;
