export interface Handlers {
    [key: string]: any;
}
export default function fetchHandlers(directory: string): Promise<Handlers>;
