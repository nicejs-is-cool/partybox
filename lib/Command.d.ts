import { User } from './User';
import { Message } from './Message';
export declare class Command {
    cmd: string;
    description: string;
    usage: string;
    aliases: string[];
    whitelist: string[];
    enabled: boolean;
    hidden: boolean;
    category: string;
    isWhitelisted(user: User): boolean;
    userCanRunCommand(user: User): boolean;
    run(message: Message): void;
}
