"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.splitUsage = void 0;
function splitUsage(usage) {
    let chars = usage.split('');
    let args = [];
    function next() {
        let res = "";
        let c = chars.shift();
        if (c === " ")
            return next();
        if (c === "[") {
            res += '[';
            while (chars.length > 0) {
                c = chars.shift();
                if (c === "]")
                    break;
                res += c;
            }
            res += ']';
            return res;
        }
        if (c === "<") {
            res += '<';
            while (chars.length > 0) {
                c = chars.shift();
                if (c === ">")
                    break;
                res += c;
            }
            res += '>';
            return res;
        }
        return "";
    }
    function getFullArray(arr = []) {
        let res = next();
        if (res) {
            arr.push(res);
            return getFullArray(arr);
        }
        else {
            return arr;
        }
    }
    return getFullArray();
}
exports.splitUsage = splitUsage;
function parseUsageArgs(usage) {
    let parsed = [];
    let usageSplit = splitUsage(usage);
    let regex_duck = /([\[<])([A-z]+): *([A-z]+)([\]>])/;
    for (let i = 0; i < usageSplit.length; i++) {
        let arg = usageSplit[i];
        let match = arg.match(regex_duck);
        if (match) {
            let argType = match[3];
            let argName = match[2];
            parsed.push({
                type: argType,
                name: argName,
                required: arg.charAt(0) === "<",
            });
        }
        else {
            parsed.push({
                type: "string",
                name: arg,
                required: true
            });
        }
    }
    return parsed;
}
exports.default = parseUsageArgs;
