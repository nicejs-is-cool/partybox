"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function fetchHandlers(directory) {
    const files = await promises_1.default.readdir(directory);
    const handlers = {};
    for (const file of files) {
        const filePath = path_1.default.join(directory, file);
        if (filePath.endsWith('.d.ts')) {
            continue;
        }
        const stat = await promises_1.default.stat(filePath);
        if (stat.isDirectory()) {
            const subHandlers = fetchHandlers(filePath);
            Object.assign(handlers, subHandlers);
        }
        else {
            const fileName = path_1.default.basename(filePath, ".js");
            const fileImport = await Promise.resolve().then(() => __importStar(require(filePath)));
            handlers[fileName] = fileImport;
        }
    }
    return handlers;
}
exports.default = fetchHandlers;
