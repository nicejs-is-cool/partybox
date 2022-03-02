"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argsparser_1 = __importDefault(require("../argsparser"));
function canSendCommandUsage(parsedUsageArgs, args) {
    let parsedArgs = new Map();
    try {
        parsedArgs = argsparser_1.default(parsedUsageArgs, args);
    }
    catch {
        return true;
    }
    if (parsedUsageArgs.length > 0 && parsedUsageArgs[0]) {
        if (parsedArgs.size !== parsedUsageArgs.length) {
            return true;
        }
    }
    return false;
}
exports.default = canSendCommandUsage;
