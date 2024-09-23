import { Command } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';
import { getRedditMeme } from '../../lib/reddit';
export class MemeCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'meme',
            description: 'Get a random meme from r/memes',
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName(this.name)
                .setDescription(this.description);
        });
    }
    async chatInputRun(interaction) {
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
        }
        catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Something went wrong :(')
                .setDescription(`${error}`)
                .setTimestamp()
                .setColor('Red');
            await interaction.editReply({ embeds: [errorEmbed] });
        }
    }
    // & Message command down below
    async messageRun(message) {
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
        }
        catch (error) {
            const errorEmbed = new EmbedBuilder()
                .setTitle('Something went wrong :(')
                .setDescription(`${error}`)
                .setTimestamp()
                .setColor('Red');
            await message.reply({ embeds: [errorEmbed] });
        }
    }
}
