import argsparser from '../lib/argsparser';

test('Can parse arguments properly', () => {
    let res = argsparser([
        {
            name: 'test',
            type: 'string',
            required: true
        },
        {
            name: 'color',
            type: 'string',
            required: true
        },
    ], 'hello red');
    expect(res).toEqual(new Map([
        ['test', 'hello'],
        ['color', 'red']
    ]));
})
test('Can parse optional arguments properly', () => {
    let res = argsparser([
        {
            name: 'test',
            type: 'string',
            required: true
        },
        {
            name: 'color',
            type: 'string',
            required: true
        },
        {
            name: 'home',
            type: 'string',
            required: false
        }
    ], 'hello red l');
    expect(res).toEqual(new Map([
        ['test', 'hello'],
        ['color', 'red'],
        ['home', 'l']
    ]));
})
test('Can parse optional arguments properly (Not passed in the arguments)', () => {
    let res = argsparser([
        {
            name: 'test',
            type: 'string',
            required: true
        },
        {
            name: 'color',
            type: 'string',
            required: true
        },
        {
            name: 'home',
            type: 'string',
            required: false
        }
    ], 'hello red');
    expect(res).toEqual(new Map([
        ['test', 'hello'],
        ['color', 'red']
    ]));
})
