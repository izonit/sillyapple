"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CoinflipCommand = void 0;
const framework_1 = require("@sapphire/framework");
const emojis_json_1 = require("../../lib/emojis.json");
class CoinflipCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'coinflip',
            description: 'Flip a coin',
            aliases: ['Coinflip', 'flip', 'Flip']
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('coinflip')
                .setDescription('Flip a coin');
        });
    }
    async chatInputRun(interaction) {
        const coin = ['heads', 'tails'];
        const result = coin[Math.floor(Math.random() * coin.length)];
        await interaction.reply(`## Flipping the coin... ${emojis_json_1.emojis.coinflip}`);
        await new Promise(resolve => setTimeout(resolve, 2400));
        await interaction.editReply(`**${interaction.user.username}** flipped the coin and got **${result}**!`);
    }
    // & Message command down below
    async messageRun(message) {
        const coin = ['heads', 'tails'];
        const result = coin[Math.floor(Math.random() * coin.length)];
        const cfmessage = await message.channel.send('## *Flipping the coin... <a:coinflip:1279832197800656918>*');
        await new Promise(resolve => setTimeout(resolve, 2400));
        await cfmessage.edit(`**${message.author.username}** flipped the coin and got **${result}**!`);
    }
}
exports.CoinflipCommand = CoinflipCommand;
