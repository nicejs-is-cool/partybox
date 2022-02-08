"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const showdown_1 = __importDefault(require("showdown"));
/**
* Converts a message so it can be used in multiple trollbox servers
* @param message The message to convert
* @param src The source of the message
* @example uMessage("**Hello world**", "trollbox.party")
* @example uMessage("*Hello world*", "cyio.trollbox.party")
* @example uMessage("~~Hello world~~", "rmtb")
* @returns {string} string
*/
function uMessage(message, src) {
    let converter = new showdown_1.default.Converter();
    let html = converter.makeHtml(message);
    if (src === "rmtb")
        return html;
    return message;
}
exports.default = uMessage;
