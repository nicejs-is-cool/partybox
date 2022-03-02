import fs from 'fs/promises'
import path from 'path'
import { Client } from '..';
export interface Handlers {
    [key: string]: any;
}
export default async function fetchHandlers(directory: string) {
    const files = await fs.readdir(directory);
    const handlers: Handlers = {};
    for (const file of files) {
        const filePath = path.join(directory, file);
        if (filePath.endsWith('.d.ts')) {
            continue;
        }
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
            const subHandlers = fetchHandlers(filePath);
            Object.assign(handlers, subHandlers);
        } else {
            const fileName = path.basename(filePath, ".js");
            const fileImport = await import(filePath);
            handlers[fileName] = fileImport;
        }
    }
    return handlers;
}