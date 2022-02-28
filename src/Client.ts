import {User} from './User';
import EventEmitter from 'events';
import { Command } from './Command';
const io = require('socket.io-client')
import * as trollbox from 'trollbox';
import { Message } from './Message';
import parseUsageArgs from './parseUsageArgs'
import argsParser from './argsparser';
import he from 'he';
import uMessage from './uMessage';
import fs from 'fs/promises'
async function getPackageVersion() {
    let packageJson = await fs.readFile('../package.json', 'utf8');
    let packageObj = JSON.parse(packageJson);
    return packageObj.version;
}
export class Client extends EventEmitter {
    public user: User;
    public users: User[];
    public commands: Command[];
    public client: any;
    private src: string = "";
    private partyBoxVersion = "?";
    constructor(public prefix: string) {
        super();
        getPackageVersion().then(version => {
            this.partyBoxVersion = version;
        })

        this.user = new User('A Partybox bot.', '#00ff00', 'local');
        this.users = [];
        this.commands = [];
        
    }
    /**
     * Sets the user used by the bot to connect to trollbox.party
     * @param user The user used by the bot to connect
     * @returns {this} self
     */
    setUser(user: User) {
        this.user = user;
        return this;
    }
    /**
     * Adds a command to the bot
     * @param command The command to add
     * @returns {void} void
     */
    addCommand(command: Command) {
        this.commands.push(command);
        
        return this;
    }
    /**
     * Sends a message to trollbox.party
     * @param message The message to send
     */
    send(message: string) {
        this.client.send(message);
    }
    /**
     * Replies to a user
     * @param user The user to reply to
     * @param usermsg The message of the user to reply to
     * @param message The message to reply to the user
     */
    reply(user: string, usermsg: string, message: string) {
        this.send(this.uMessage(`*${user}: ${usermsg}*\n${message}`));
    }
    /** Connecs to trollbox.party
     * @returns {void} void
     */
    connect(src: string = "trollbox.party") {
        this.src = src;
        if (src === "trollbox.party") {
            this.client = io("https://trollbox.party", {
                path: "/api/v0/si",
                forceNew: true
            });
        }
        if (src === "cyio.trollbox.party") {
            this.client = io("https://trollbox.party", {
                path: "/api/v0/si",
                forceNew: true
            });
        }
        if (src === "rmtb") {
            this.client = io("https://rmtrollbox.eu-gb.mybluemix.net");
        }
        this.client.on(src === "trollbox.party" ? "_connected" : "connect", () => {
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
                        if (parsedArgs.size !== parsedUsageArgs.length) {
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
        this.client.on('update users', (users: trollbox.User[]) => {
            this.users = users.map(user => new User(user.nick, user.color, user.home));
            this.emit('update users', this.users);
        })
    }
    /**
     * Converts a message so it can be used in multiple trollbox servers
     * @param message The message to convert
     * @returns {string} string
     */
    uMessage(message: string) {
        return uMessage(message, this.src);
    }
}
