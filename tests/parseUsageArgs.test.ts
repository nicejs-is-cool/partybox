import parseUsageArgs, { splitUsage } from '../src/parseUsageArgs';

test('Can parse usage properly', () => {
    let usage = '<msg: string> <color: string> [home: string]';
    let usageSplit = parseUsageArgs(usage);
    expect(usageSplit).toEqual([
        {
            type: 'string',
            name: 'msg',
            required: true
        },
        {
            type: 'string',
            name: 'color',
            required: true
        },
        {
            type: 'string',
            name: 'home',
            required: false
        }
    ]);
})
test('Can split usage into a array properly', () => {
    let usage = '<msg: string> <color: string> [home: string]';
    let usageSplit = splitUsage(usage);
    expect(usageSplit).toEqual([
        '<msg: string>',
        '<color: string>',
        '[home: string]'
    ]);
})