"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorListener = void 0;
const framework_1 = require("@sapphire/framework");
const colors_1 = require("colors");
class ErrorListener extends framework_1.Listener {
    constructor(context, options) {
        super(context, {
            ...options,
            event: "listenerError"
        });
    }
    async run() {
        console.log(colors_1.red.red(`[Listener Error] ${this.container.constructor.name}`));
    }
}
exports.ErrorListener = ErrorListener;
