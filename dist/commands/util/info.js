"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
class InfoCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'info',
            description: 'Information about the bot',
            aliases: ['botinfo', 'Info'],
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('info')
                .setDescription('Information about the bot');
        });
    }
    async chatInputRun(interaction) {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Silly Apple')
            .setDescription('### Bot information.')
            .addFields({ name: 'Version', value: '1.1 | Beta test | indev', inline: false }, { name: 'Author', value: '.izonit2', inline: false }, { name: 'Created', value: '<t:1725112200:R>', inline: false }, { name: 'Library', value: '[@discord.js](https://github.com/discordjs/discord.js)', inline: true }, { name: 'Framework', value: '[@sapphire/framework](https://github.com/sapphiredev/framework/)', inline: true }, { name: 'Node version', value: `${process.version}`, inline: true }, { name: 'Language', value: 'TypeScript', inline: true }, { name: 'GitHub repository', value: '[*click*](https://github.com/izonit/sillyapple)', inline: false }, { name: 'Prefix', value: `\`${process.env.DEFAULT_PREFIX}\``, inline: false })
            .setTimestamp()
            .setColor('Green')
            .setImage('https://media.discordapp.net/attachments/1279789331602604095/1279791774415716525/SillyApple.png?ex=66d5ba78&is=66d468f8&hm=237f530b327e70eb2a8d5ec1c781560ed65d412fc316a87b66d70fd931a4c067&=&format=webp&quality=lossless&width=134&height=132');
        await interaction.reply({ embeds: [embed] });
    }
    // & Chat command down below
    async messageRun(message) {
        const embed = new discord_js_1.EmbedBuilder()
            .setColor(0x0099ff)
            .setTitle('Silly Apple')
            .setDescription('### Bot information.')
            .addFields({ name: 'Version', value: '1.1 | Beta test | indev', inline: false }, { name: 'Author', value: '.izonit2', inline: false }, { name: 'Created', value: '<t:1725112200:R>', inline: false }, { name: 'Library', value: '[@discord.js](https://github.com/discordjs/discord.js)', inline: true }, { name: 'Framework', value: '[@sapphire/framework](https://github.com/sapphiredev/framework/)', inline: true }, { name: 'Node version', value: `${process.version}`, inline: true }, { name: 'Language', value: 'TypeScript', inline: true }, { name: 'GitHub repository', value: '[*click*](https://github.com/izonit/sillyapple)', inline: false }, { name: 'Prefix', value: `\`${process.env.DEFAULT_PREFIX}\``, inline: false })
            .setTimestamp()
            .setColor('Green')
            .setImage('https://media.discordapp.net/attachments/1279789331602604095/1279791774415716525/SillyApple.png?ex=66d5ba78&is=66d468f8&hm=237f530b327e70eb2a8d5ec1c781560ed65d412fc316a87b66d70fd931a4c067&=&format=webp&quality=lossless&width=134&height=132');
        await message.reply({ embeds: [embed] });
    }
}
exports.InfoCommand = InfoCommand;
