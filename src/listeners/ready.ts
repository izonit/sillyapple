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
      console.log('Ready!');
    }
  }
}