import { Listener } from "@sapphire/framework";

export class MentionPrefixOnlyListener extends Listener {
  async run(message) {
    // const prefix = this.container.client.options.defaultPrefix
    // message.channel.send(prefix ? `Prefix is \`${prefix}\` (whitespace included)` : `No prefix set`)

    message.channel.send('I am silly.')
    message.channel.send('\<:lightmoon:1279442972739637309>')
  }
}