"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function argsParser(usageArgs, args) {
    let parsed = new Map();
    var patterns = [
        ["wspace", /^\s+/],
        ["identifier", /^[a-zA-Z_]\w*/],
        //["oparen", /^\(/],
        //["cparen", /^\)/],
        ["float", /^-?\d+\.\d+/],
        ["int", /^-?\d+/],
        //["obrace", /^\{/],
        //["cbrace", /^\}/],
        //["obracket", /^\[/],
        //["cbracket", /^\]/],
        // match two quotes containing any number of escaped-backslash, escaped quote, or any non-quote characters.
        ["string", /^"(\\\\|\\"|[^"])*"/],
        //["comment", /^\/\/.*/],
        ["other", /^[\s\S]/],
    ];
    // finds the next token in the input string, starting at input[i], using the given token patterns.
    // returns a token and an updated starting index, or causes assertion failure if it was unable to parse a token.
    function read_token(input, i, patterns) {
        // assert.ok(input.length > 0, "zero-length input");
        // assert.ok(i < input.length, "starting index past end of input");
        for (var j = 0; j < patterns.length; j++) {
            var regex = patterns[j][1];
            var result = input.slice(i).match(regex);
            if (result !== null) {
                var text = result[0];
                var token = [j, i, text.length];
                return [token, i + text.length];
            }
        }
        //assert.fail("exhausted input while lexing token");
        throw new Error('exhausted input while lexing token');
    }
    // takes an input string and a list of token patterns and tokenizes the string.
    // returns a list of tokens.
    function tokenize(input, patterns) {
        var tokens = [];
        for (var i = 0; i < input.length;) {
            var result = read_token(input, i, patterns);
            if (!result)
                continue;
            var token = result[0];
            i = result[1];
            tokens.push(token);
            // console.log("Debug: found token: ", token);
        }
        return tokens;
    }
    let tokens_unp = tokenize(args, patterns);
    let tokens = [];
    for (let i = 0; i < tokens_unp.length; i++) {
        var token = tokens_unp[i];
        var token_type = patterns[token[0]][0];
        var token_text = args.substring(token[1], token[1] + token[2]);
        let obj = { token, type: token_type, text: token_text };
        tokens.push(obj);
    }
    for (let token of tokens) {
        if (token.type === "wspace")
            continue;
        if (token.type === "comment")
            continue;
        if (!usageArgs[parsed.size]) {
            throw new Error("extra argument: " + token.text);
            continue;
        }
        if (token.type === "string") {
            parsed.set(usageArgs[parsed.size].name, JSON.parse(token.text));
            continue;
        }
        if (token.type === "int") {
            //console.log(token.text)
            parsed.set(usageArgs[parsed.size].name, parseInt(token.text));
            continue;
        }
        if (token.type === "float") {
            parsed.set(usageArgs[parsed.size].name, parseFloat(token.text));
            continue;
        }
        if (token.type === "identifier") {
            parsed.set(usageArgs[parsed.size].name, token.text);
            continue;
        }
        /*if (token.type === "other") {
            throw new Error(`unknown token type: ${token.type}`);
        }*/
    }
    ;
    return parsed;
}
exports.default = argsParser;
