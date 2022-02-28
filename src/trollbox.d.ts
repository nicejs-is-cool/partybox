declare module 'trollbox' {
    export interface Message {
        nick: string;
        msg: string;
        color: string;
        date: number;
        home: string;
    }
    declare interface User {
        nick: string;
        color: string;
        home: string;
        style: string;
    }
}