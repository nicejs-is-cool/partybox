export interface usageArg {
    name: string;
    type: string;
    required: boolean;
}
export declare function splitUsage(usage: string): any;
export default function parseUsageArgs(usage: string): usageArg[];
