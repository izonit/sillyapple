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
      await new Promise(resolve => setTimeout(resolve, 1250));
      // ^ Made because sometimes the message is sent inbetween application registry logs 
      console.log(this.container.logger.info(`Successfully logged in as ${this.container.client.user.tag}.`));
    }
  }
}