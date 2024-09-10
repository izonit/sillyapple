import { Command } from '@sapphire/framework';
import { type Message } from 'discord.js';
import { sun_variations } from '../../lib/emojis.json';

export class RandomsunCommand extends Command { 
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'randomsun',
      description: 'Random sun emoji',
      aliases: ['sun', 'Randomsun', 'Sun']
    });
  }

  // & Message command down below

  public override async messageRun(message: Message) {
    const sunVariationsArray = Object.keys(sun_variations);
    await message.reply({
      content: `${sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName('randomsun')
        .setDescription('Random sun emoji');
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const sunVariationsArray = Object.keys(sun_variations);
    await interaction.reply({
      content: `${sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
    });
  }
}