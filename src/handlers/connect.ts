import { Client } from "..";
export default function trigger(client: Client) {
    client.emit("connected");
    client.client.emit('user joined', ...client.user.toArray());
}