import { Command } from '@sapphire/framework';
import { isMessageInstance } from '@sapphire/discord.js-utilities';
import { EmbedBuilder, type Message } from 'discord.js';
import { RandomLoadingMessage } from '../../lib/constants';

export class PingCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: 'ping',
      description: 'Ping-pong',
      aliases: ['pong', 'Ping']
    });
  }

  // & Slash command down below
  
  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName('ping')
        .setDescription('Ping-pong')
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const msg = await interaction.reply({
      content: `${RandomLoadingMessage[Math.floor(Math.random() * RandomLoadingMessage.length)]}`,
      fetchReply: true
    });
    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .setDescription(`Latency: ${msg.createdTimestamp - interaction.createdTimestamp}ms\nAPI Latency: ${Math.round(this.container.client.ws.ping)}ms`)
      .setColor('Green')
      .setTimestamp();

    if (isMessageInstance(msg)) {
      return interaction.editReply({ 
        content: ``,
        embeds: [embed] 
      });
    }
  }

  // & Chat command down below

  public override async messageRun(message: Message) {
    const msg = await message.reply({
      content: `${RandomLoadingMessage[Math.floor(Math.random() * RandomLoadingMessage.length)]}`,
    });
    const embed = new EmbedBuilder()
      .setTitle('Pong!')
      .setDescription(`Latency: ${msg.createdTimestamp - message.createdTimestamp}ms\nAPI Latency: ${Math.round(this.container.client.ws.ping)}ms`)
      .setColor('Green')
      .setTimestamp();

    return msg.edit({ 
      content: ``,
      embeds: [embed] 
    });
  }
}