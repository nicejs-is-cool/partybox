import { usageArg } from "../parseUsageArgs";
import argsParser from "../argsparser";
export default function canSendCommandUsage(parsedUsageArgs: usageArg[], args: string) {
    let parsedArgs = new Map<string, any>();
    try {
        parsedArgs = argsParser(parsedUsageArgs, args);
    } catch {
        return true;
    }
    if (parsedUsageArgs.length > 0 && parsedUsageArgs[0]) {
        if (parsedArgs.size !== parsedUsageArgs.length) {
            return true
        }
    }
    return false;
}