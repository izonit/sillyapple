"use strict";
// * Help embed (../commands/util/help.ts)
// * Made for easier command management
Object.defineProperty(exports, "__esModule", { value: true });
exports.helpEmbed = void 0;
const discord_js_1 = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
exports.helpEmbed = new discord_js_1.EmbedBuilder()
    .setTitle('Help')
    .setDescription('### Command list with extended info about them')
    .addFields({ name: 'Prefix', value: `\`${process.env.DEFAULT_PREFIX}}\``, inline: false }, { name: '`Echo`', value: 'Send a message *anonymously* | **Usage:** slash command version only', inline: false }, { name: '`Hello`', value: `Say hello | **Usage:** \`${process.env.DEFAULT_PREFIX}hello <@user>\``, inline: false }, { name: '`Hug`', value: `Hug someone | **Usage:** \`${process.env.DEFAULT_PREFIX}hug <@user>\``, inline: false }, { name: '`Tickle`', value: `Tickle someone | **Usage:** \`${process.env.DEFAULT_PREFIX}tickle <@user> [item]\``, inline: false }, { name: '`Cat`', value: `Get a random cat picture | **Usage:** \`${process.env.DEFAULT_PREFIX}cat\``, inline: false }, { name: '`Coinflip`', value: `Flip a coin | **Usage:** \`${process.env.DEFAULT_PREFIX}coinflip\``, inline: false }, { name: '`Ping`', value: `Get the bot ping | **Usage:** \`${process.env.DEFAULT_PREFIX}ping\``, inline: false }, { name: '`Help`', value: `Get help about the bot commands | **Usage:** \`${process.env.DEFAULT_PREFIX}help\``, inline: false }, { name: '`Info`', value: `Get the bot info | **Usage:** \`${process.env.DEFAULT_PREFIX}info\``, inline: false }, { name: '`Wiki`', value: `Search the Wiki | **Usage:** \`${process.env.DEFAULT_PREFIX}wiki <query>\`` }, { name: '`Meme`', value: `Get a random meme from **r/memes** | **Usage:** \`${process.env.DEFAULT_PREFIX}meme\`` }, { name: '`Minesweeper`', value: `Play minesweeper | **Usage:** \`${process.env.DEFAULT_PREFIX}minesweeper <width> <height> <bombsCount>\` (**All params must be less than 11.**)` }, { name: '`Ascii`', value: `Convert text to ASCII art | **Usage:** slash command version only` }, { name: '`Advancement`', value: `Generate an advancement image | **Usage:** slash command version only` }, { name: '`salt`', value: `Generate a salt overlay over an image | **Usage:** ${process.env.DEFAULT_PREFIX}salt <Attachment>` })
    .setFooter({ text: 'Params in <> are required, [] are optional' })
    .setColor('Aqua')
    .setTimestamp();
