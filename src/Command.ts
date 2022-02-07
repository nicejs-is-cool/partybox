import {User} from './User'
import {Message} from './Message'
export class Command {
    /** The name of the command */
    public cmd: string = "placeholder";
    /** The description of the command (visible if you are using the default HelpCommand class) */
    public description: string = "placeholder";
    /** The usage of the command used for getting the arguments of the command */
    public usage: string = "<msg: string>";
    /** Aliases for this command */
    public aliases: string[] = [];
    /** List of homes that are allowed to run this command */
    public whitelist: string[] = [];
    /** Is the command enabled? */
    public enabled: boolean = true;
    /** Hides the command from (prefix)help */
    public hidden: boolean = false;
    /** The category of the command used on the default help command */
    public category = "No Category";
    /** Function that checks if the user is whitelisted
     * @param user The user to check
     * @returns True if the user is whitelisted, false otherwise
     */
    isWhitelisted(user: User) {
        if (user.home) return this.whitelist.includes(user.home);
        return false;
    }
    /** Checks if the specified user can run this command
     * @param user The user to check
     * @returns True if the user can run this command, false otherwise
     */
    userCanRunCommand(user: User): boolean {
        if (this.whitelist.length > 0) {
            if (!this.isWhitelisted(user)) return false;
        }
        return true;
    }
    /**
     * Method executed when the command is runned
     * @param message The message that was sent
     * @returns {void} void
     */
    run(message: Message): void {
        console.log("run() method not implemented for " + this.cmd);
    }
}
