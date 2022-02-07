"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HelpCommand = void 0;
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
        let sendmsg = `${message.clientInstance.user.name} bot
Powered by Partybox (W.I.P.)

Avaliable Commands:
${categoriesString}`;
        message.reply(sendmsg);
    }
}
exports.HelpCommand = HelpCommand;
