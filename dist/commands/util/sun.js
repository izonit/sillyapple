"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RandomsunCommand = void 0;
const framework_1 = require("@sapphire/framework");
const emojis_json_1 = require("../../lib/emojis.json");
class RandomsunCommand extends framework_1.Command {
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
        const sunVariationsArray = Object.keys(emojis_json_1.sun_variations);
        await message.reply({
            content: `${emojis_json_1.sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
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
        const sunVariationsArray = Object.keys(emojis_json_1.sun_variations);
        await interaction.reply({
            content: `${emojis_json_1.sun_variations[sunVariationsArray[Math.floor(Math.random() * sunVariationsArray.length)]]}`,
        });
    }
}
exports.RandomsunCommand = RandomsunCommand;
