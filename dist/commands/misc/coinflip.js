import { Command } from '@sapphire/framework';
import { emojis } from "../../lib/emojis.json";
export class CoinflipCommand extends Command {
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
        await interaction.reply(`## Flipping the coin... ${emojis.coinflip}`);
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
