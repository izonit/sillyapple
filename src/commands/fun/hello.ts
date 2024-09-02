import { Args, Command } from '@sapphire/framework';
import { type Message } from 'discord.js';

export class HelloCommand extends Command {
  public constructor (context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'hello',
      description: 'Say hello',
      aliases: ['hi', 'greet'],
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder //
        .setName('hello')
        .setDescription('Say hello')
        .addUserOption((option) =>
          option //
            .setName('user')
            .setDescription('The user to say hello to')
            .setRequired(true))
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      content: `Hello, ${interaction.options.getUser('user')?.username ?? 'Unknown user'}!`,
    });
  }

  // & Message command down below

  public override async messageRun(message: Message, args: Args) {
    const user = await args.pick('user');
    
    const msg = await message.reply({
      content: `Hello, ${user.username ?? 'Unknown user'}!`,
    });
  }
}