"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const event = {
    name: "ready",
    once: true,
    execute: (client) => {
        console.log(`Logged in as ${client.user?.tag}`);
    },
};
exports.default = event;
//# sourceMappingURL=ready.js.map