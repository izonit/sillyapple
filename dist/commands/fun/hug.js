import { Command } from '@sapphire/framework';
export class HugCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'hug',
            description: 'Hug someone',
            aliases: ['Hug', 'hugs']
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder //
                .setName('hug')
                .setDescription('Hug someone')
                .addUserOption((option) => option //
                .setName('user')
                .setDescription('The user to hug')
                .setRequired(true));
        });
    }
    async chatInputRun(interaction) {
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
    async messageRun(message, args) {
        const user = await args.pick('user');
        await message.reply({
            content: `**${message.author.username}** hugged **${user.username ?? 'Unknown user'}**`
        });
        await message.channel.send({
            content: 'https://images-ext-1.discordapp.net/external/pzfPk7X0r5JmkBI1OFfVfOQtS6_nb-_0LNzrtnOgETo/https/cdn.weeb.sh/images/HJ7lY_QwW.gif',
        });
    }
}
