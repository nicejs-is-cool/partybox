import { Client, User } from "..";
import * as trollbox from 'trollbox'
export default function trigger(client: Client, users: trollbox.UserList) {
    client.users = Object.entries(users).map(user => new User(user[1].nick, user[1].color, user[1].home, user[0]));
    client.emit('update users', client.users);
}