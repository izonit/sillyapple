import { Command, Args } from '@sapphire/framework';
import { type Message } from 'discord.js';

export class HugCommand extends Command {
  public constructor (context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'hug',
      description: 'Hug someone',
      aliases: ['Hug', 'hugs']
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder //
        .setName('hug')
        .setDescription('Hug someone')
        .addUserOption((option) =>
          option //
            .setName('user')
            .setDescription('The user to hug')
            .setRequired(true))
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    /* 
    if (interaction.options.getUser('user')?.id === interaction.user.id) {
      return await interaction.reply({ content: 'You can\'t hug yourself' });
    }
    else if (interaction.options.getUser('user')?.id === this.container.client.user?.id) {         =======>
      return await interaction.reply({ content: 'Thanks for willing to hug me, but you can\'t' });
    } 
    */
    await interaction.reply({
      content: `**${interaction.user.username}** hugged **${interaction.options.getUser('user')?.username ?? 'Unknown user'}**`
    });
    await interaction.channel?.send({
      content: 'https://images-ext-1.discordapp.net/external/pzfPk7X0r5JmkBI1OFfVfOQtS6_nb-_0LNzrtnOgETo/https/cdn.weeb.sh/images/HJ7lY_QwW.gif'
    }); 
  }

  // & Message command down below

  public override async messageRun(message: Message, args: Args) {
    const user = await args.pick('user');
    const item = await args.finished ? null : await args.pick('string');

    const msg = await message.reply({
      content: `**${message.author.username}** hugged **${user.username ?? 'Unknown user'}**`
    });
    const gif = await message.channel.send({
      content: 'https://images-ext-1.discordapp.net/external/pzfPk7X0r5JmkBI1OFfVfOQtS6_nb-_0LNzrtnOgETo/https/cdn.weeb.sh/images/HJ7lY_QwW.gif'
    });
  }
}