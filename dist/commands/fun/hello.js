import { Command } from '@sapphire/framework';
export class HelloCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'hello',
            description: 'Say hello',
            aliases: ['Hello', 'hi', 'greet'],
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder //
                .setName('hello')
                .setDescription('Say hello')
                .addUserOption((option) => option //
                .setName('user')
                .setDescription('The user to say hello to')
                .setRequired(true));
        });
    }
    async chatInputRun(interaction) {
        await interaction.reply({
            content: `Hello, ${interaction.options.getUser('user')?.username ?? 'Unknown user'}!`,
        });
    }
    // & Message command down below
    async messageRun(message, args) {
        const user = await args.pick('user');
        await message.reply({
            content: `Hello, ${user.username ?? 'Unknown user'}!`,
        });
    }
}
