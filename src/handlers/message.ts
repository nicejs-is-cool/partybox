import { Client, User, Message } from '..';
import canSendCommandUsage from '../utils/canSendCommandUsage';
import he from 'he';
import parseUsageArgs from '../parseUsageArgs';
import argsParser from '../argsparser';

export default function trigger(client: Client, msg: any) {
    let msgmsg = he.decode(msg.msg);
    if (!msgmsg.startsWith(client.prefix)) return;
    let msgg = msgmsg.slice(client.prefix.length);
    let msgSplit = msgg.split(/ +/);
    let command = msgSplit[0];
    let args = msgSplit.slice(1).join(' ');
    let user = new User(he.decode(msg.nick), msg.color, msg.home);
    
    client.commands.forEach(cmd => {
        if (cmd.cmd === command || cmd.aliases?.includes?.(command)) {
            let parsedUsageArgs = parseUsageArgs(cmd.usage);
            let parsedArgs = new Map<string, any>();
            if (canSendCommandUsage(parsedUsageArgs, args) && !cmd.disableUsageChecking) {
                return client.reply(msg.nick, msgmsg, `Usage: ${client.prefix}${cmd.cmd} ${client.src === "rmtb" ? he.encode(cmd.usage) : cmd.usage}`);
            }
            parsedArgs = argsParser(parsedUsageArgs, args);
            let message = new Message(user, msgmsg, new Date(msg.date), parsedArgs, client);
            if (cmd.userCanRunCommand(user)) {
                cmd.run(message)
            } else {
                return client.reply(msg.nick, msgmsg, `You do not have permission to run this command.`);
            }
        }
    })
    client.emit('command', command, args, user);
}