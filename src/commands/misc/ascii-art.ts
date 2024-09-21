import { Command, type Args, ChatInputCommandAcceptedPayload, ChatInputCommand } from '@sapphire/framework';
import { ChatInputApplicationCommandData, type Message } from 'discord.js';
import axios from 'axios';

export class AsciiCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ascii',
      description: 'Converts inputted text into ASCII art',
    });
  }

  public override registerApplicationCommands(registry: ChatInputCommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName(this.name)
        .setDescription(this.description)
        .addStringOption((option) =>
          option
            .setName('text')
            .setDescription('The text to convert into ASCII art')
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName('font')
            .setDescription('The font to use')
            .setRequired(false)
            .addChoices(
              { name: 'Impossible', value: 'Impossible' },
              { name: 'Fraktur', value: 'Fraktur' },
              { name: 'Keyboard', value: 'Keyboard' },
              { name: 'Lean', value: 'Lean' },
              { name: 'Letters', value: 'Letters' }
            )
        )
    );
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const inputText = interaction.options.getString('text', true)?.toString().trim().replace(/\s+/g, '+');
    const font = interaction.options.getString('font', true);

    if (inputText.length > 20) {
      return interaction.reply({ content: '### :cold_sweat: Please enter a text with a maximum length of 20 characters!' });
    }

    try {
      const response = await axios.get(`https://asciified.thelicato.io/api/v2/ascii?text=${inputText}&font=${font}`);

      await interaction.reply({ content: `\`\`\`${response.data}\`\`\`` });
    } catch (error) {
      console.error('Error generating ASCII art:', error);
      await interaction.reply({ content: `## :cold_sweat: There was an error generating ASCII art. Please try again later.\n**Error message:** ${error}` });
    }
  }
}
