export declare class User {
    name: string;
    color: string;
    home?: string | undefined;
    sid?: string | undefined;
    constructor(name: string, color: string, home?: string | undefined, sid?: string | undefined);
    toArray(bot?: boolean): string[];
    setName(name: string): this;
    setColor(color: string): this;
}
