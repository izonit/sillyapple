"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaltCommand = void 0;
const framework_1 = require("@sapphire/framework");
const discord_js_1 = require("discord.js");
const Canvas = require("@napi-rs/canvas");
class SaltCommand extends framework_1.Command {
    constructor(context, options) {
        super(context, {
            ...options,
            name: "salt",
            description: "Adds salt overlay to an image",
        });
    }
    async messageRun(message) {
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
        const attachment = new discord_js_1.AttachmentBuilder(await canvas.encode('png'), { name: 'salted.png' });
        return await message.reply({
            files: [
                attachment
            ]
        });
    }
}
exports.SaltCommand = SaltCommand;
