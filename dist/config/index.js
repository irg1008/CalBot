"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path = ".env";
dotenv_1.default.config({ path });
const config = {
    token: process.env.TOKEN || "",
    clientId: process.env.CLIENT_ID || "",
    guildId: process.env.TEST_GUILD_ID || "",
    prefix: "#",
};
exports.default = config;
//# sourceMappingURL=index.js.map