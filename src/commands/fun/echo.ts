import { Command } from '@sapphire/framework';
import { EmbedBuilder } from 'discord.js';

export class EchoCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
    });
  }

  public override async registerApplicationCommands(registry: Command.Registry): Promise<void> {
    registry.registerChatInputCommand((builder) => {
      builder //
        .setName('echo')
        .setDescription('Echoes your message')
        .addStringOption((option) =>
          option //
            .setName('text')
            .setDescription('The text to say')
            .setRequired(true)
        );
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const embed = new EmbedBuilder()
      .setTitle('Anonymous message')
      .setDescription(`${interaction.options.getString('text', true)}`)
      .setTimestamp();

    await interaction.reply({ 
      content: 'Message succesfully sent.',
      ephemeral: true,
    });

    await interaction.channel?.send({ embeds: [embed] });
  }
}