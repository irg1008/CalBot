"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const desploySlashCommands_1 = __importDefault(require("utils/desploySlashCommands"));
const client_1 = __importDefault(require("client"));
client_1.default.init();
// Deploy commands so they update on the discord server.
(async () => await (0, desploySlashCommands_1.default)(client_1.default))();
// GCalendar.
/*(async () => {
    const events = await example();
    console.log(events);
})();*/
//# sourceMappingURL=index.js.map