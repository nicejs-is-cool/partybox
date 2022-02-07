"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor() {
        this.cmd = "placeholder";
        this.description = "placeholder";
        this.usage = "<msg: string>";
        this.aliases = [];
        this.whitelist = [];
        this.enabled = true;
        this.hidden = false;
        this.category = "No Category";
    }
    isWhitelisted(user) {
        if (user.home)
            return this.whitelist.includes(user.home);
        return false;
    }
    userCanRunCommand(user) {
        if (this.whitelist.length > 0) {
            if (!this.isWhitelisted(user))
                return false;
        }
        return true;
    }
    run(message) {
        console.log("run() method not implemented for " + this.cmd);
    }
}
exports.Command = Command;
