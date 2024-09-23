import { Command } from '@sapphire/framework';
import { EmbedBuilder, type Message} from 'discord.js';
import { getRedditMeme } from '../../lib/reddit';
import * as dotenv from 'dotenv';

dotenv.config()

export class MemeCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'meme',
      description: 'Get a random meme from r/memes',
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName(this.name)
        .setDescription(this.description);
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    await interaction.deferReply();

    try {
      const meme = await getRedditMeme();
      const embed = new EmbedBuilder()
        .setTitle(meme.title)
        .setURL(`https://reddit.com${meme.permalink}`)
        .setImage(meme.url)
        .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.num_comments} comments` })
        .setColor(0x0099ff)
        .setTimestamp();

      await interaction.editReply({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('Something went wrong :(')
        .setDescription(`${error}`)
        .setTimestamp()
        .setColor('Red');

      await interaction.editReply({ embeds: [errorEmbed] });
    }
  }

  // & Message command down below

  public override async messageRun(message: Message) {
    try {
      const meme = await getRedditMeme();
      const embed = new EmbedBuilder()
        .setTitle(meme.title)
        .setURL(`https://reddit.com${meme.permalink}`)
        .setImage(meme.url)
        .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.num_comments} comments` })
        .setColor(0x0099ff)
        .setTimestamp();

      await message.reply({ embeds: [embed] });
    } catch (error) {
      const errorEmbed = new EmbedBuilder()
        .setTitle('Something went wrong :(')
        .setDescription(`${error}`)
        .setTimestamp()
        .setColor('Red');

      await message.reply({ embeds: [errorEmbed] });
    }
  }
}