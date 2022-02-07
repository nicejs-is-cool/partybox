"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Command = void 0;
class Command {
    constructor() {
        /** The name of the command */
        this.cmd = "placeholder";
        /** The description of the command (visible if you are using the default HelpCommand class) */
        this.description = "placeholder";
        /** The usage of the command used for getting the arguments of the command
         * The type of the argument can be either `string`, `int` or `float`
         * <> means its required
         * [] means its optional
         */
        this.usage = "<msg: string>";
        /** Aliases for this command */
        this.aliases = [];
        /** List of homes that are allowed to run this command */
        this.whitelist = [];
        /** Is the command enabled? */
        this.enabled = true;
        /** Hides the command from (prefix)help */
        this.hidden = false;
        /** The category of the command used on the default help command */
        this.category = "No Category";
    }
    /** Function that checks if the user is whitelisted
     * @param user The user to check
     * @returns True if the user is whitelisted, false otherwise
     */
    isWhitelisted(user) {
        if (user.home)
            return this.whitelist.includes(user.home);
        return false;
    }
    /** Checks if the specified user can run this command
     * @param user The user to check
     * @returns True if the user can run this command, false otherwise
     */
    userCanRunCommand(user) {
        if (this.whitelist.length > 0) {
            if (!this.isWhitelisted(user))
                return false;
        }
        return true;
    }
    /**
     * Method executed when the command is runned
     * @param message The message that was sent
     * @returns {void} void
     */
    run(message) {
        console.log("run() method not implemented for " + this.cmd);
    }
}
exports.Command = Command;
