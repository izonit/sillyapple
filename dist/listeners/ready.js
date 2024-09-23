"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadyListener = void 0;
const framework_1 = require("@sapphire/framework");
class ReadyListener extends framework_1.Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            once: true,
            event: "ready"
        });
    }
    async run() {
        if (this.container.client && this.container.client.user) {
            console.log('Ready!');
        }
    }
}
exports.ReadyListener = ReadyListener;
