import {User} from './User'
import {Message} from './Message'
export class Command {
    public cmd: string = "placeholder";
    public description: string = "placeholder";
    public usage: string = "<msg: string>";
    public aliases: string[] = [];
    public whitelist: string[] = [];
    public enabled: boolean = true;
    public hidden: boolean = false;
    public category = "No Category";
    isWhitelisted(user: User) {
        if (user.home) return this.whitelist.includes(user.home);
        return false;
    }
    userCanRunCommand(user: User): boolean {
        if (this.whitelist.length > 0) {
            if (!this.isWhitelisted(user)) return false;
        }
        return true;
    }
    run(message: Message): void {
        console.log("run() method not implemented for " + this.cmd);
    }
}
