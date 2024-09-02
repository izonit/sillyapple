import { Command } from "@sapphire/framework";
import { type Message } from "discord.js";

export class CatCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "cat",
      description: "Sends a random cat image",
      aliases: ['Cat', "cats", "pet"],
    });
  }

  // & Slash command down below

  public override async registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) => {
      builder
        .setName("cat")
        .setDescription("Sends a random cat image");
    });
  }

  public override async chatInputRun(interaction: Command.ChatInputCommandInteraction) {
    const catUrl = `https://cataas.com/cat?t=${Math.floor(Date.now() / 1000)}`;
    await interaction.reply({ 
      content: 'Here you go, your cat pic is served. They are ticklish, aren\'t they? 🌞',
     });
    await interaction.channel?.send({
      content: catUrl,
    });
  }

  // & Message command down below

  public override async messageRun(message: Message) {
    const catUrl = `https://cataas.com/cat?t=${Math.floor(Date.now() / 1000)}`;
    await message.reply({ 
      content: 'Here you go, your cat pic is served. They are ticklish, aren\'t they? 🌞',
     });
    await message.channel?.send({
      content: catUrl,
    });
  }
}