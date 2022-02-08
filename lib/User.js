"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
class User {
    constructor(name, color, home) {
        this.name = name;
        this.color = color;
        this.home = home;
    }
    toArray() {
        return [this.name, this.color, "bot", ""];
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
