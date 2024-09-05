import { Command } from '@sapphire/framework';
import axios from 'axios';
import { EmbedBuilder, type Message } from 'discord.js';

export class WikiCommand extends Command {
    constructor(context: any, options: any) {
        super(context, {
            ...options,
            name: 'wiki',
            description: 'Fetch a Wikipedia summary for a given search term.',
            aliases: ['wikipedia', 'w', "Wiki"]
        });
    }

    async messageRun(message: Message, args: any) {
      const query = await args.rest('string').catch(() => null);
      if (!query) {
          return message.channel.send('Please provide a search term!');
      }

      const summary = await this.fetchWikiSummary(query);

      if (!summary) {
          return message.channel.send('No Wikipedia page found for this search term.');
      }

      const embed = new EmbedBuilder()
          .setTitle(`Wikipedia Summary: ${query}`)
          .setDescription(summary.extract)
          .setURL(summary.pageUrl)
          .setColor('#0099ff')
          .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png')
          .setTimestamp();

      await message.channel.send({ embeds: [embed] });
  }

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
        builder
            .setName(this.name)
            .setDescription(this.description)
            .addStringOption((option) =>
                option
                    .setName('query')
                    .setDescription('The search term for the Wikipedia page.')
                    .setRequired(true)
            )
    );
  }

  async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const query = await (interaction?.options?.getString('query') ?? null);
    if (!query) {
        return interaction.reply('Please provide a search term!');
    }

    const summary = await this.fetchWikiSummary(query);

    if (!summary) {
        return interaction.reply('No Wikipedia page found for this search term.');
    }

    const embed = new EmbedBuilder()
        .setTitle(`Wikipedia Summary: ${query}`)
        .setDescription(summary.extract)
        .setURL(summary.pageUrl)
        .setColor('#0099ff')
        .setThumbnail('https://upload.wikimedia.org/wikipedia/commons/6/63/Wikipedia-logo.png')
        .setTimestamp();

    await interaction.reply({ embeds: [embed] });
}

  async fetchWikiSummary(query: string): Promise<{ extract: string; pageUrl: string } | null> {
      const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

      try {
          const response = await axios.get(url);
          const data = response.data;

          if (data && data.extract) {
              return {
                  extract: data.extract,
                  pageUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(query)}`,
              };
          }

          return null;
      } catch (error) {
          console.error(error);
          return null;
      }
  }
}