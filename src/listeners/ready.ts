import { Listener } from "@sapphire/framework";
import colors from 'colors';

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
      await new Promise(resolve => setTimeout(resolve, 650));
      // ^ Made because sometimes the message is sent inbetween application registry logs 
      console.log(colors.green(`Logged in as ${this.container.client.user.tag}!`));
    }
  }
}