import { Client } from '.';
import { User } from './User';
export declare class Message {
    author: User;
    content: string;
    timestamp: Date;
    args: Map<string, any>;
    clientInstance: Client;
    constructor(author: User, content: string, timestamp: Date, args: Map<string, any>, clientInstance: Client);
    reply(message: string): void;
}
