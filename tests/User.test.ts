import { User } from '../lib/User';

test('Can convert user to array', () => {
    let user = new User('test', 'red');
    expect(user.toArray(false)).toEqual(['test', 'red', '', '']);
})
test('Can set name of the user', () => {
    let user = new User('test', 'red');
    expect(user.setName('test2').name).toBe('test2');
})
test('Can set color of the user', () => {
    let user = new User('test', 'red');
    expect(user.setColor('blue').color).toBe('blue');
})
