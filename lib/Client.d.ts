/// <reference types="node" />
import { User } from './User';
import EventEmitter from 'events';
import { Command } from './Command';
export declare class Client extends EventEmitter {
    prefix: string;
    user: User;
    users: User[];
    commands: Command[];
    client: any;
    constructor(prefix: string);
    setUser(user: User): this;
    addCommand(command: Command): this;
    send(message: string): void;
    reply(user: string, usermsg: string, message: string): void;
    connect(): void;
}
