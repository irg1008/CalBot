"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interactionCreate_1 = __importDefault(require("./interactionCreate"));
const ready_1 = __importDefault(require("./ready"));
const messageCreate_1 = __importDefault(require("./messageCreate"));
exports.default = [interactionCreate_1.default, ready_1.default, messageCreate_1.default];
//# sourceMappingURL=index.js.map