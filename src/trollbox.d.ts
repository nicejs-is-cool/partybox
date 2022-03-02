declare module 'trollbox' {
    export interface Message {
        nick: string;
        msg: string;
        color: string;
        date: number;
        home: string;
    }
    export interface User {
        nick: string;
        color: string;
        home: string;
        style: string;
    }
    export interface UserList {
        [key: string]: User;
    }
}