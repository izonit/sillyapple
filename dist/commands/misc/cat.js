import { Command } from "@sapphire/framework";
export class CatCommand extends Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: "cat",
            description: "Sends a random cat image",
            aliases: ['Cat', "cats", "pet"],
        });
    }
    // & Slash command down below
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => {
            builder
                .setName("cat")
                .setDescription("Sends a random cat image");
        });
    }
    async chatInputRun(interaction) {
        const catUrl = `https://cataas.com/cat?t=${Math.floor(Date.now() / 1000)}`;
        await interaction.reply({
            content: 'Here you go, your cat pic is served. They are ticklish, aren\'t they? 🌞',
        });
        await interaction.channel?.send({
            content: catUrl,
        });
    }
    // & Message command down below
    async messageRun(message) {
        const catUrl = `https://cataas.com/cat?t=${Math.floor(Date.now() / 1000)}`;
        await message.reply({
            content: 'Here you go, your cat pic is served. They are ticklish, aren\'t they? 🌞',
        });
        await message.channel?.send({
            content: catUrl,
        });
    }
}
