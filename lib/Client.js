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
const uMessage_1 = __importDefault(require("./uMessage"));
const promises_1 = __importDefault(require("fs/promises"));
async function getPackageVersion() {
    let packageJson = await promises_1.default.readFile('../package.json', 'utf8');
    let packageObj = JSON.parse(packageJson);
    return packageObj.version;
}
class Client extends events_1.default {
    constructor(prefix) {
        super();
        this.prefix = prefix;
        this.src = "";
        this.partyBoxVersion = "?";
        getPackageVersion().then(version => {
            this.partyBoxVersion = version;
        });
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
        this.send(this.uMessage(`*${user}: ${usermsg}*\n${message}`));
    }
    /** Connecs to trollbox.party
     * @returns {void} void
     */
    connect(src = "trollbox.party") {
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
                        if (parsedArgs.size !== parsedUsageArgs.length) {
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
        this.client.on('update users', (users) => {
            this.users = users.map(user => new User_1.User(user.nick, user.color, user.home));
            this.emit('update users', this.users);
        });
    }
    /**
     * Converts a message so it can be used in multiple trollbox servers
     * @param message The message to convert
     * @returns {string} string
     */
    uMessage(message) {
        return uMessage_1.default(message, this.src);
    }
}
exports.Client = Client;
