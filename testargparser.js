let {default: parseUsageArgs} = require("./lib/parseUsageArgs");
let {default: argsParser} = require("./lib/argsparser");
let susduc = parseUsageArgs("<name: string> <age: int>");
console.log(argsParser(susduc, 'nicejs 69'))