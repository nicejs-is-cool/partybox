import { User } from './User';
import { Message } from './Message';
export declare class Command {
    /** The name of the command */
    cmd: string;
    /** The description of the command (visible if you are using the default HelpCommand class) */
    description: string;
    /** The usage of the command used for getting the arguments of the command
     * The type of the argument can be either `string`, `int` or `float`
     * <> means its required
     * [] means its optional
     */
    usage: string;
    /** Aliases for this command */
    aliases: string[];
    /** List of homes that are allowed to run this command */
    whitelist: string[];
    /** Is the command enabled? */
    enabled: boolean;
    /** Hides the command from (prefix)help */
    hidden: boolean;
    /** The category of the command used on the default help command */
    category: string;
    /** Function that checks if the user is whitelisted
     * @param user The user to check
     * @returns True if the user is whitelisted, false otherwise
     */
    isWhitelisted(user: User): boolean;
    /** Checks if the specified user can run this command
     * @param user The user to check
     * @returns True if the user can run this command, false otherwise
     */
    userCanRunCommand(user: User): boolean;
    /**
     * Method executed when the command is runned
     * @param message The message that was sent
     * @returns {void} void
     */
    run(message: Message): void;
}
