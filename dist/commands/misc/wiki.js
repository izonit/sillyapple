"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WikiCommand = void 0;
const framework_1 = require("@sapphire/framework");
const axios_1 = require("axios");
const discord_js_1 = require("discord.js");
class WikiCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: 'wiki',
            description: 'Fetch a Wikipedia summary for a given search term.',
            aliases: ['wikipedia', 'w', "Wiki"]
        });
    }
    async messageRun(message, args) {
        const query = await args.rest('string').catch(() => null);
        if (!query) {
            return message.reply('Please provide a search term!');
        }
        const summary = await this.fetchWikiSummary(query);
        if (!summary) {
            return message.reply('No Wikipedia page found for this search term.');
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`Wikipedia Summary: ${query}`)
            .setDescription(summary.extract)
            .setURL(summary.pageUrl)
            .setColor('#0099ff')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png')
            .setTimestamp();
        await message.reply({ embeds: [embed] });
    }
    async registerApplicationCommands(registry) {
        registry.registerChatInputCommand((builder) => builder
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) => option
            .setName('query')
            .setDescription('The search term for the Wikipedia page.')
            .setRequired(true)));
    }
    async chatInputRun(interaction) {
        const query = await (interaction?.options?.getString('query') ?? null);
        if (!query) {
            return interaction.reply('Please provide a search term!');
        }
        const summary = await this.fetchWikiSummary(query);
        if (!summary) {
            return interaction.reply('No Wikipedia page found for this search term.');
        }
        const embed = new discord_js_1.EmbedBuilder()
            .setTitle(`Wikipedia Summary: ${query}`)
            .setDescription(summary.extract)
            .setURL(summary.pageUrl)
            .setColor('#0099ff')
            .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png')
            .setTimestamp();
        await interaction.reply({ embeds: [embed] });
    }
    async fetchWikiSummary(query) {
        const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;
        try {
            const response = await axios_1.default.get(url);
            const data = response.data;
            if (data && data.extract) {
                return {
                    extract: data.extract,
                    pageUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
                };
            }
            return null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    }
}
exports.WikiCommand = WikiCommand;
