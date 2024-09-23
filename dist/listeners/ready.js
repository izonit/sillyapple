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
            await new Promise(resolve => setTimeout(resolve, 1550));
            // ^ Made because sometimes the message is sent inbetween application registry logs 
            this.container.logger.info(`/=============================================================\\\n|           Successfully logged in as ${this.container.client.user.tag}        |`);
            this.container.logger.info(`|                         </> DEVELOPMENT                     |\n\\=============================================================/`);
            // ^ my god, this formatting is insane... How did I even come up with this!?
        }
    }
}
exports.ReadyListener = ReadyListener;
