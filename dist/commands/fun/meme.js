"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemeCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const reddit_1 = require("../../lib/reddit");
const dotenv = require("dotenv");
dotenv.config();
class MemeCommand extends framework_1.Command {
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
            const meme = await (0, reddit_1.getRedditMeme)();
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.num_comments} comments` })
                .setColor(0x0099ff)
                .setTimestamp();
            await interaction.editReply({ embeds: [embed] });
        }
        catch (error) {
            const errorEmbed = new discord_js_1.EmbedBuilder()
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
            const meme = await (0, reddit_1.getRedditMeme)();
            const embed = new discord_js_1.EmbedBuilder()
                .setTitle(meme.title)
                .setURL(`https://reddit.com${meme.permalink}`)
                .setImage(meme.url)
                .setFooter({ text: `👍 ${meme.ups} | 💬 ${meme.num_comments} comments` })
                .setColor(0x0099ff)
                .setTimestamp();
            await message.reply({ embeds: [embed] });
        }
        catch (error) {
            const errorEmbed = new discord_js_1.EmbedBuilder()
                .setTitle('Something went wrong :(')
                .setDescription(`${error}`)
                .setTimestamp()
                .setColor('Red');
            await message.reply({ embeds: [errorEmbed] });
        }
    }
}
exports.MemeCommand = MemeCommand;
