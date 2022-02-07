import { Command } from './Command';
import { Message } from './Message';
export class HelpCommand extends Command {
    cmd = "help";
    description = "Help Command";
    usage = "";
    aliases = ["cmds", "commands"];
    run(message: Message) {
        let prefix = message.clientInstance.prefix;
        let commands = message.clientInstance.commands;
        let categories = new Map<string, Command[]>();
        commands.forEach(cmd => {
            if (cmd.hidden) return;
            if (!categories.has(cmd.category)) categories.set(cmd.category, []);
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