export interface usageArg {
    name: string;
    type: string;
    required: boolean;
}
export function splitUsage(usage: string) {
    let chars = usage.split('');
    let args: any = [];
    function next(): string {
        let res = "";
        
        let c = chars.shift();
        if (c === " ") return next();
        if (c === "[") {
            res += '[';
            while (chars.length > 0) {
                c = chars.shift();
                if (c === "]") break;
                res += c;
            }
            res += ']';
            return res;
        }
        if (c === "<") {
            res += '<';
            while (chars.length > 0) {
                c = chars.shift();
                if (c === ">") break;
                res += c;
            }
            res += '>';
            return res;
        }
        return "";
    }
    function getFullArray(arr: string[] = []): any {
        let res = next();
        if (res) {
            arr.push(res);
            return getFullArray(arr)
        } else {
            return arr;
        }
        
    }
    return getFullArray();
}
export default function parseUsageArgs(usage: string): usageArg[] {
    let parsed: usageArg[] = [];
    let usageSplit = splitUsage(usage);
    let regex_duck = /([\[<])([A-z]+): *([A-z]+)([\]>])/;

    for (let i = 0; i < usageSplit.length; i++) {
        let arg = usageSplit[i];
        let match = arg.match(regex_duck);
        if (match) {
            let argType: string = match[3];
            let argName = match[2];
            parsed.push({
                type: argType,
                name: argName,
                required: arg.charAt(0) === "<",
            });
        } else {
            parsed.push({
                type: "string",
                name: arg,
                required: true
            });
        }
    }
    return parsed;
}