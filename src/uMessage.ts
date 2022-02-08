import Showdown from "showdown"
/**
* Converts a message so it can be used in multiple trollbox servers
* @param message The message to convert
* @param src The source of the message
* @example uMessage("**Hello world**", "trollbox.party")
* @example uMessage("*Hello world*", "cyio.trollbox.party")
* @example uMessage("~~Hello world~~", "rmtb")
* @returns {string} string
*/
export default function uMessage(message: string, src: string) {
    let converter = new Showdown.Converter();
    let html = converter.makeHtml(message);
    if (src === "rmtb") return html;
    return message;
}