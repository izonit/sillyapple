import { Listener } from "@sapphire/framework";
export class ReadyListener extends Listener {
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
