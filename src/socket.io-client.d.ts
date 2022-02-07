declare module 'socket.io-client' {
    export interface SocketIOClientOptions {
        path: string;
        forceNew: boolean;
    }
    export default function io(url: string, opts?: SocketIOClientOptions): any;

}