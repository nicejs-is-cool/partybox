import { Command } from './Command';
import { Message } from './Message';
export declare class HelpCommand extends Command {
    cmd: string;
    description: string;
    usage: string;
    aliases: string[];
    run(message: Message): void;
}
