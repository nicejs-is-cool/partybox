import {User} from './User';
import EventEmitter from 'events';
import { Command } from './Command';
const io = require('socket.io-client')
import * as trollbox from 'trollbox';
import { Message } from './Message';
import parseUsageArgs from './parseUsageArgs'
import argsParser from './argsparser';
import he from 'he';

export class Client extends EventEmitter {
    public user: User;
    public users: User[];
    public commands: Command[];
    public client: any;
    constructor(public prefix: string) {
        super();
        this.user = new User('A Partybox bot.', '#00ff00', 'local');
        this.users = [];
        this.commands = [];
        
    }
    setUser(user: User) {
        this.user = user;
        return this;
    }
    addCommand(command: Command) {
        this.commands.push(command);
        
        return this;
    }
    send(message: string) {
        this.client.send(message);
    }
    reply(user: string, usermsg: string, message: string) {
        this.send(`*${user}: ${usermsg}*\n${message}`);
    }
    connect() {
        this.client = io("https://trollbox.party", {
            path: "/api/v0/si",
            forceNew: true
        });
        this.client.on("_connected", () => {
            this.emit("connected");
            this.client.emit('user joined', ...this.user.toArray());
        })
        this.client.on("message", (msg: trollbox.Message) => {
            let msgmsg = he.decode(msg.msg);
            if (!msgmsg.startsWith(this.prefix)) return;
            let msgg = msgmsg.slice(this.prefix.length);
            let msgSplit = msgg.split(/ +/);
            let command = msgSplit[0];
            let args = msgSplit.slice(1).join(' ');
            let user = new User(he.decode(msg.nick), msg.color, msg.home);
            
            this.commands.forEach(cmd => {
                //console.log(cmd, command);
                if (cmd.cmd === command || cmd.aliases?.includes?.(command)) {
                    let parsedUsageArgs = parseUsageArgs(cmd.usage);
                    let parsedArgs = new Map<string, any>();
                    try {
                        parsedArgs = argsParser(parsedUsageArgs, args);
                    } catch {
                        this.reply(msg.nick, msgmsg, `Usage: ${this.prefix}${cmd.cmd} ${cmd.usage}`);
                        return;
                    }
                    if (parsedUsageArgs.length > 0 && parsedUsageArgs[0]) {
                        if (parsedArgs.size !== parseUsageArgs.length) {
                            this.reply(msg.nick, msgmsg, `Usage: ${this.prefix}${cmd.cmd} ${cmd.usage}`);
                            return;
                        }
                    }
                    let message = new Message(user, msgmsg, new Date(msg.date), parsedArgs, this);
                    if (cmd.userCanRunCommand(user)) {
                        cmd.run(message)
                    } else {
                        return this.reply(msg.nick, msgmsg, `You do not have permission to run this command.`);
                    }
                }
            })
        })
    }
}
