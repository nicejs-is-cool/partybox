"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const canSendCommandUsage_1 = __importDefault(require("../utils/canSendCommandUsage"));
const he_1 = __importDefault(require("he"));
const parseUsageArgs_1 = __importDefault(require("../parseUsageArgs"));
const argsparser_1 = __importDefault(require("../argsparser"));
function trigger(client, msg) {
    let msgmsg = he_1.default.decode(msg.msg);
    if (!msgmsg.startsWith(client.prefix))
        return;
    let msgg = msgmsg.slice(client.prefix.length);
    let msgSplit = msgg.split(/ +/);
    let command = msgSplit[0];
    let args = msgSplit.slice(1).join(' ');
    let user = new __1.User(he_1.default.decode(msg.nick), msg.color, msg.home);
    client.commands.forEach(cmd => {
        var _a, _b;
        if (cmd.cmd === command || ((_b = (_a = cmd.aliases) === null || _a === void 0 ? void 0 : _a.includes) === null || _b === void 0 ? void 0 : _b.call(_a, command))) {
            let parsedUsageArgs = parseUsageArgs_1.default(cmd.usage);
            let parsedArgs = new Map();
            if (canSendCommandUsage_1.default(parsedUsageArgs, args) && !cmd.disableUsageChecking) {
                return client.reply(msg.nick, msgmsg, `Usage: ${client.prefix}${cmd.cmd} ${client.src === "rmtb" ? he_1.default.encode(cmd.usage) : cmd.usage}`);
            }
            parsedArgs = argsparser_1.default(parsedUsageArgs, args);
            let message = new __1.Message(user, msgmsg, new Date(msg.date), parsedArgs, client);
            if (cmd.userCanRunCommand(user)) {
                cmd.run(message);
            }
            else {
                return client.reply(msg.nick, msgmsg, `You do not have permission to run this command.`);
            }
        }
    });
    client.emit('command', command, args, user);
}
exports.default = trigger;
