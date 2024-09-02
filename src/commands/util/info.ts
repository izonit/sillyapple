import { Command } from '@sapphire/framework';
import { EmbedBuilder, ThreadMemberFlagsBitField, type Message } from 'discord.js';
import { defaultPrefix } from '../../../config.json'

export class InfoCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'info',
      description: 'Information about the bot',
      aliases: ['botinfo', 'Info'],
    })
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName('info')
        .setDescription('Information about the bot');
    }

    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Silly Apple')
      .setDescription('### Bot information.')
      .addFields(
        { name: 'Version', value: '1.1 | Beta test | indev', inline: false },
        { name: 'Author', value: '.izonit2', inline: false },
        { name: 'Created', value: '<t:1725112200:R>', inline: false },
        { name: 'Library', value: '[@discord.js](https://github.com/discordjs/discord.js)', inline: true },
        { name: 'Framework', value: '[@sapphire/framework](https://github.com/sapphiredev/framework/)', inline: true },
        { name: 'Node version', value: `${process.version}`, inline: true },
        { name: 'Language' , value: 'TypeScript', inline: true },
        { name: 'GitHub repository', value: '[\*click*](https://github.com/izonit/sillyapple)', inline: false },
        { name: 'Prefix', value: `\`${defaultPrefix}\``, inline: false },  
      )
      .setTimestamp()
      .setColor('Green')
      .setImage('https://media.discordapp.net/attachments/1279789331602604095/1279791774415716525/SillyApple.png?ex=66d5ba78&is=66d468f8&hm=237f530b327e70eb2a8d5ec1c781560ed65d412fc316a87b66d70fd931a4c067&=&format=webp&quality=lossless&width=134&height=132')

    await interaction.reply({ embeds: [embed] });
  }

  // & Chat command down below

  public override async messageRun(message: Message) {
    const embed = new EmbedBuilder()
      .setColor(0x0099ff)
      .setTitle('Silly Apple')
      .setDescription('### Bot information.')
      .addFields(
        { name: 'Version', value: '1.1 | Beta test | indev', inline: false },
        { name: 'Author', value: '.izonit2', inline: false },
        { name: 'Created', value: '<t:1725112200:R>', inline: false },
        { name: 'Library', value: '[@discord.js](https://github.com/discordjs/discord.js)', inline: true },
        { name: 'Framework', value: '[@sapphire/framework](https://github.com/sapphiredev/framework/)', inline: true },
        { name: 'Node version', value: `${process.version}`, inline: true },
        { name: 'Language' , value: 'TypeScript', inline: true },
        { name: 'GitHub repository', value: '[\*click*](https://github.com/izonit/sillyapple)', inline: false },
        { name: 'Prefix', value: `\`${defaultPrefix}\``, inline: false },  
      )
      .setTimestamp()
      .setColor('Green')
      .setImage('https://media.discordapp.net/attachments/1279789331602604095/1279791774415716525/SillyApple.png?ex=66d5ba78&is=66d468f8&hm=237f530b327e70eb2a8d5ec1c781560ed65d412fc316a87b66d70fd931a4c067&=&format=webp&quality=lossless&width=134&height=132')
  
    await message.reply({ embeds: [embed] });    
  }
}