/// <reference types="node" />
import { User } from './User';
import EventEmitter from 'events';
import { Command } from './Command';
import { Handlers } from './utils/fetchHandlers';
export declare class Client extends EventEmitter {
    prefix: string;
    user: User;
    users: User[];
    commands: Command[];
    client: any;
    handlers: Handlers;
    src: string;
    partyBoxVersion: string;
    constructor(prefix: string);
    /**
     * Sets the user used by the bot to connect to trollbox.party
     * @param user The user used by the bot to connect
     * @returns {this} self
     */
    setUser(user: User): this;
    /**
     * Adds a command to the bot
     * @param command The command to add
     * @returns {void} void
     */
    addCommand(command: Command): this;
    /**
     * Sends a message to trollbox.party
     * @param message The message to send
     */
    send(message: string): void;
    /**
     * Replies to a user
     * @param user The user to reply to
     * @param usermsg The message of the user to reply to
     * @param message The message to reply to the user
     */
    reply(user: string, usermsg: string, message: string): void;
    /** Connecs to trollbox.party
     * @returns {void} void
     */
    connect(src?: string): Promise<void>;
    /**
     * Converts a message so it can be used in multiple trollbox servers
     * @param message The message to convert
     * @returns {string} string
     */
    uMessage(message: string): string;
}
