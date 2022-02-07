import { Client } from '.';
import {User} from './User';
export class Message {
    constructor(public author: User, public content: string, public timestamp: Date, public args: Map<string, any>, public clientInstance: Client) {}
    reply(message: string) {
        this.clientInstance.reply(this.author.name, this.content, message);
    }
}