import { Command } from '@sapphire/framework';
import { sun_variations } from '../../lib/emojis.json';
export class RandomsunCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'randomsun',
            description: 'Random sun emoji',
            aliases: ['sun', 'Randomsun', 'Sun']
        });
    }
    // & Message command down below
    async messageRun(message) {
        const sunVariationsArray = Object.keys(sun_variations);
        await message.reply({
            content: `${sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('randomsun')
                .setDescription('Random sun emoji');
        });
    }
    async chatInputRun(interaction) {
        const sunVariationsArray = Object.keys(sun_variations);
        await interaction.reply({
            content: `${sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
        });
    }
}
