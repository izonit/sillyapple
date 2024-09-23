"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MentionPrefixOnlyListener = void 0;
const framework_1 = require("@sapphire/framework");
class MentionPrefixOnlyListener extends framework_1.Listener {
    async run(message) {
        // const prefix = this.container.client.options.defaultPrefix
        // message.channel.send(prefix ? `Prefix is \`${prefix}\` (whitespace included)` : `No prefix set`)
        message.channel.send('I am silly.');
        message.channel.send('<:lightmoon:1279442972739637309>');
    }
}
exports.MentionPrefixOnlyListener = MentionPrefixOnlyListener;
