import { Command } from '@sapphire/framework';
import { type Message} from 'discord.js';
import { helpEmbed } from '../../lib/helpEmbed';
import * as dotenv from 'dotenv';

dotenv.config();

export class HelpCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'help',
      description: 'Get help about the bot',
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName('help')
        .setDescription('Get help about the bot');
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    interaction.reply({ embeds: [helpEmbed] });
  }

  // & Message command down below

  public override async messageRun(message: Message) {
    message.reply({ embeds: [helpEmbed] });
  }
}