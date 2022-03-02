"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
function trigger(client, users) {
    client.users = Object.entries(users).map(user => new __1.User(user[1].nick, user[1].color, user[1].home, user[0]));
    client.emit('update users', client.users);
}
exports.default = trigger;
