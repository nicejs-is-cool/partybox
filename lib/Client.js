"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = void 0;
const User_1 = require("./User");
const events_1 = __importDefault(require("events"));
const io = require('socket.io-client');
const Message_1 = require("./Message");
const parseUsageArgs_1 = __importDefault(require("./parseUsageArgs"));
const argsparser_1 = __importDefault(require("./argsparser"));
const he_1 = __importDefault(require("he"));
class Client extends events_1.default {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        this.user = new User_1.User('A Partybox bot.', '#00ff00', 'local');
        this.users = [];
        this.commands = [];
    }
    /**
     * Sets the user used by the bot to connect to trollbox.party
     * @param user The user used by the bot to connect
     * @returns {this} self
     */
    setUser(user) {
        this.user = user;
        return this;
    }
    /**
     * Adds a command to the bot
     * @param command The command to add
     * @returns {void} void
     */
    addCommand(command) {
        this.commands.push(command);
        return this;
    }
    /**
     * Sends a message to trollbox.party
     * @param message The message to send
     */
    send(message) {
        this.client.send(message);
    }
    /**
     * Replies to a user
     * @param user The user to reply to
     * @param usermsg The message of the user to reply to
     * @param message The message to reply to the user
     */
    reply(user, usermsg, message) {
        this.send(`*${user}: ${usermsg}*\n${message}`);
    }
    /** Connecs to trollbox.party
     * @returns {void} void
     */
    connect() {
        this.client = io("https://trollbox.party", {
            path: "/api/v0/si",
            forceNew: true
        });
        this.client.on("_connected", () => {
            this.emit("connected");
            this.client.emit('user joined', ...this.user.toArray());
        });
        this.client.on("message", (msg) => {
            let msgmsg = he_1.default.decode(msg.msg);
            if (!msgmsg.startsWith(this.prefix))
                return;
            let msgg = msgmsg.slice(this.prefix.length);
            let msgSplit = msgg.split(/ +/);
            let command = msgSplit[0];
            let args = msgSplit.slice(1).join(' ');
            let user = new User_1.User(he_1.default.decode(msg.nick), msg.color, msg.home);
            this.commands.forEach(cmd => {
                var _a, _b;
                //console.log(cmd, command);
                if (cmd.cmd === command || ((_b = (_a = cmd.aliases) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, command))) {
                    let parsedUsageArgs = parseUsageArgs_1.default(cmd.usage);
                    let parsedArgs = new Map();
                    try {
                        parsedArgs = argsparser_1.default(parsedUsageArgs, args);
                    }
                    catch {
                        this.reply(msg.nick, msgmsg, `Usage: ${this.prefix}${cmd.cmd} ${cmd.usage}`);
                        return;
                    }
                    if (parsedUsageArgs.length > 0 && parsedUsageArgs[0]) {
                        if (parsedArgs.size !== parseUsageArgs_1.default.length) {
                            this.reply(msg.nick, msgmsg, `Usage: ${this.prefix}${cmd.cmd} ${cmd.usage}`);
                            return;
                        }
                    }
                    let message = new Message_1.Message(user, msgmsg, new Date(msg.date), parsedArgs, this);
                    if (cmd.userCanRunCommand(user)) {
                        cmd.run(message);
                    }
                    else {
                        return this.reply(msg.nick, msgmsg, `You do not have permission to run this command.`);
                    }
                }
            });
        });
    }
}
exports.Client = Client;
