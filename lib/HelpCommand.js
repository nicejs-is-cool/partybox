"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
const he_1 = __importDefault(require("he"));
const Command_1 = require("./Command");
class HelpCommand extends Command_1.Command {
    constructor() {
        super(...arguments);
        this.cmd = "help";
        this.description = "Help Command";
        this.usage = "";
        this.aliases = ["cmds", "commands"];
    }
    run(message) {
        let prefix = message.clientInstance.prefix;
        let commands = message.clientInstance.commands;
        let categories = new Map();
        commands.forEach(cmd => {
            if (cmd.hidden)
                return;
            if (!categories.has(cmd.category))
                categories.set(cmd.category, []);
            //@ts-ignore
            categories.get(cmd.category).push(cmd);
        });
        let categoriesString = "";
        categories.forEach((cmds, category) => {
            categoriesString += `\n**${category}**\n`;
            cmds.forEach(cmd => {
                categoriesString += `    ${prefix}${cmd.cmd} ${cmd.usage} - ${cmd.description} - Aliases: ${cmd.aliases.join(', ')}\n`;
            });
        });
        if (message.clientInstance.src === "rmtb") {
            categoriesString = he_1.default.encode(categoriesString);
        }
        let sendmsg = `${message.clientInstance.user.name} bot
Powered by [Partybox](//npmjs.com/package/partybox) v${message.clientInstance.partyBoxVersion}

Avaliable Commands:
${categoriesString}`;
        message.reply(sendmsg);
    }
}
exports.HelpCommand = HelpCommand;
