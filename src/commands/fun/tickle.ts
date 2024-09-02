import { Command, Args} from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { type Message } from 'discord.js'

export class TickleCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder //
        .setName('tickle')
        .setDescription('Tickle someone')
        .addUserOption(option => 
          option //
            .setName('user')
            .setDescription('The user to tickle')
            .setRequired(true)
        )
        .addStringOption(option =>
          option //
            .setName('item')
            .setDescription('The item to tickle with')
            .setRequired(false)
        )
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      content: 'Tickling... ',
      fetchReply: true,
    });

    if (isMessageInstance(msg)) {
      if (interaction.options.getString('item')) {
        return interaction.editReply({
          content: `**${interaction.user.username}** tickled **${interaction.options.getUser('user')?.username ?? 'Unknown user'}** with **${interaction.options.getString('item')}**`,
        });
      } else {
        return interaction.editReply({
          content: `**${interaction.user.username}** tickled **${interaction.options.getUser('user')?.username ?? 'Unknown user'}**`,
        });
      }
    }
  }

  // & Message command down below

  public override async messageRun(message: Message, args: Args) {
    const user = await args.pick('user');
    const item = await args.finished ? null : await args.pick('string');

    const msg = await message.reply({
      content: 'Tickling... ',
    });

    if (isMessageInstance(msg)) {
      if (item) {
        return msg.edit({
          content: `**${message.author.username}** tickled **${user.username ?? 'Unknown user'}** with **${item}**`,
        });
      } else {
        return msg.edit({
          content: `**${message.author.username}** tickled **${user.username ?? 'Unknown user'}**`,
        });
      }
    }
  }
}