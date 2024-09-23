import { Command } from '@sapphire/framework';
import axios from 'axios';
import { emojis } from '../../lib/emojis.json';
export class AdvancementCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'advancement-gen',
            description: 'Generates an advancement image',
        });
    }
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName('advancement')
                .setDescription('Generates an advancement image')
                .addStringOption((option) => option
                .setName('title')
                .setDescription('The title of the advancement')
                .setRequired(true))
                .addStringOption((option) => option
                .setName('field')
                .setDescription('The description of the advancement')
                .setRequired(true))
                .addStringOption((option) => option
                .setName('block')
                .setDescription('The icon of the advancement')
                .setRequired(true)
                .setAutocomplete(true) // Enable autocomplete
            );
        });
    }
    async chatInputRun(interaction) {
        const block = interaction.options.getString('block')?.toString().trim().replace(/\s+/g, '..');
        const title = interaction.options.getString('title')?.toString().trim().replace(/\s+/g, '..');
        const field = interaction.options.getString('field')?.toString().trim().replace(/\s+/g, '..');
        const imageUrl = `https://minecraft-api.com/api/achivements/${block}/${title}/${field}`;
        try {
            if (title.length > 45) {
                return interaction.reply({ content: '### :cold_sweat: Title cannot be longer than __45__ characters due to API limitations.' });
            }
            if (field.length > 45) {
                return interaction.reply({ content: '### :cold_sweat: Description cannot be longer than __45__ characters due to API limitations.' });
            }
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            if (response.status !== 200) {
                return interaction.reply('Failed to fetch the image. Try again later.');
            }
            const buffer = Buffer.from(response.data, 'binary');
            await interaction.reply({
                files: [{ attachment: buffer, name: 'advancement.png' }]
            });
        }
        catch (error) {
            await interaction.reply(`## :cold_sweat: There was an error fetching the image.\n${emojis.info} **Error: ** \`${error}\``);
        }
    }
    async autocompleteRun(interaction) {
        const focusedValue = interaction.options.getFocused();
        const blockOptions = ['firework_rocket', 'grass_block'];
        const filtered = blockOptions.filter((block) => block.toLowerCase().startsWith(focusedValue.toLowerCase()));
        await interaction.respond(filtered.map((block) => ({ name: block, value: block })));
    }
}
