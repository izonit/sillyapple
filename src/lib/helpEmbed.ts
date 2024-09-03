// * Help embed (../commands/util/help.ts)
// * Made for easier command management

import { EmbedBuilder } from 'discord.js';
import { defaultPrefix } from '../../config.json';

export const helpEmbed = new EmbedBuilder()
      .setTitle('Help')
      .setDescription('### Command list with extended info about them')
      .addFields(
        { name: 'Prefix', value: `\`${defaultPrefix}\``, inline: false },
        { name: '`Echo`', value: 'Send a message *anonymously* | **Usage:** slash command version only', inline: false },
        { name: '`Hello`', value: `Say hello | **Usage:** \`${defaultPrefix}hello <@user>\``, inline: false },
        { name: '`Hug`', value: `Hug someone | **Usage:** \`${defaultPrefix}hug <@user>\``, inline: false },
        { name: '`Tickle`', value: `Tickle someone | **Usage:** \`${defaultPrefix}tickle <@user> [item]\``, inline: false },
        { name: '`Cat`', value: `Get a random cat picture | **Usage:** \`${defaultPrefix}cat\``, inline: false },
        { name: '`Coinflip`', value: `Flip a coin | **Usage:** \`${defaultPrefix}coinflip\``, inline: false },
        { name: '`Ping`', value: `Get the bot ping | **Usage:** \`${defaultPrefix}ping\``, inline: false },
        { name: '`Help`', value: `Get help about the bot commands | **Usage:** \`${defaultPrefix}help\``, inline: false },
        { name: '`Info`', value: `Get the bot info | **Usage:** \`${defaultPrefix}info\``, inline: false },
      )
      .setFooter({ text: 'Params in <> are required, [] are optional' })
      .setColor('Aqua')
      .setTimestamp();