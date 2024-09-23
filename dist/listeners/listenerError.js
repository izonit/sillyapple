import { Listener } from "@sapphire/framework";
import { red as colors } from "colors";
export class ErrorListener extends Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: "listenerError"
        });
    }
    async run() {
        console.log(colors.red(`[Listener Error] ${this.container.constructor.name}`));
    }
}
