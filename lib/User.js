"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, color, home, sid) {
        this.name = name;
        this.color = color;
        this.home = home;
        this.sid = sid;
    }
    toArray(bot = true) {
        return [this.name, this.color, bot ? "bot" : "", ""];
    }
    setName(name) {
        this.name = name;
        return this;
    }
    setColor(color) {
        this.color = color;
        return this;
    }
}
exports.User = User;
