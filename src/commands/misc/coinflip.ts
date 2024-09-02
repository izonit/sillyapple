import { Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { type Message } from 'discord.js';

export class CoinflipCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'coinflip',
      description: 'Flip a coin',
      aliases: ['flip']
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName('coinflip')
        .setDescription('Flip a coin');
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const coin = ['heads', 'tails'];
    const result = coin[Math.floor(Math.random() * coin.length)];

    await interaction.reply('## Flipping the coin... <a:coinflip:1279832197800656918>');  
    await new Promise(resolve => setTimeout(resolve, 2400));
    await interaction.editReply(`**${interaction.user.username}** flipped the coin and got **${result}**!`);
  }

  // & Message command down below

  public override async messageRun(message: Message) {
    const coin = ['heads', 'tails'];
    const result = coin[Math.floor(Math.random() * coin.length)];

    await message.reply('## Flipping the coin... <a:coinflip:1279832197800656918>');  
    await new Promise(resolve => setTimeout(resolve, 2400));
    await message.reply(`**${message.author.username}** flipped the coin and got **${result}**!`);
  }
}