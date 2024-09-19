import { Command } from "@sapphire/framework";
import { AttachmentBuilder, type Message } from "discord.js";
import * as Canvas from "@napi-rs/canvas";

export class SaltCommand extends Command {
  public constructor(context: Command.Context, options: Command.Options) {
    super(context, {
      ...options,
      name: "salt",
      description: "Adds salt overlay to an image",
    });
  }

  public override async messageRun(message: Message) {
    const image = message.attachments.first();
    const saltOverlay = await Canvas.loadImage("https://cdn.discordapp.com/attachments/1051078935514980362/1283757002815963176/resize.gif?ex=66e42760&is=66e2d5e0&hm=985615a5d8c5e4b724222bc135d43f3f68890a49c9948b317f03c026a91986d8&");

    if (!image) {
      return message.channel.send("Please provide an image to salt!");
    }

    const canvas = Canvas.createCanvas(image.width || 512, image.height || 512);
		const context = canvas.getContext('2d');
    
    const bg = await Canvas.loadImage(image.url);

    context.drawImage(bg, 0, 0, canvas.width, canvas.height);
    context.drawImage(saltOverlay, 0, 0, canvas.width - canvas.width / 2, canvas.height - canvas.height / 2);

    const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'salted.png' });

    return await message.reply({
      files: [
        attachment
      ]
    });
  }
}