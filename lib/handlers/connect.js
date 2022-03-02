"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function trigger(client) {
    client.emit("connected");
    client.client.emit('user joined', ...client.user.toArray());
}
exports.default = trigger;
