"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Message = void 0;
class Message {
    constructor(author, content, timestamp, args, clientInstance) {
        this.author = author;
        this.content = content;
        this.timestamp = timestamp;
        this.args = args;
        this.clientInstance = clientInstance;
    }
    reply(message) {
        this.clientInstance.reply(this.author.name, this.content, message);
    }
}
exports.Message = Message;
