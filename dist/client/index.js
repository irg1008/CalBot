"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const discord_js_1 = require("discord.js");
const config_1 = __importDefault(require("config"));
const commands_1 = require("lib/commands");
const events_1 = __importDefault(require("lib/events"));
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    slashCommands = new discord_js_1.Collection();
    events = new discord_js_1.Collection();
    config = config_1.default;
    aliases = new discord_js_1.Collection();
    async init() {
        this.login(this.config.token);
        // Commands.
        commands_1.commands.forEach((command) => {
            this.commands.set(command.name, command);
            if (command?.aliases?.length !== 0) {
                command.aliases?.forEach((alias) => {
                    this.aliases.set(alias, command);
                });
            }
        });
        // Slash Commands.
        commands_1.slashCommands.forEach((command) => {
            this.slashCommands.set(command.data.name, command);
        });
        // Events.
        events_1.default.forEach(async (event) => {
            this.events.set(event.name, event);
            if (event.once) {
                this.once(event.name, event.execute.bind(null, this));
            }
            else {
                this.on(event.name, event.execute.bind(null, this));
            }
        });
    }
}
exports.ExtendedClient = ExtendedClient;
const client = new ExtendedClient({
    intents: [
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_EMOJIS_AND_STICKERS",
        "GUILD_MESSAGE_REACTIONS",
    ],
});
exports.default = client;
//# sourceMappingURL=index.js.map