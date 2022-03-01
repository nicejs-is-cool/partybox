import { Command } from '../lib/Command';
import { User } from '../lib/User'

test('isWhitelisted() returns true if the user is whitelisted', () => {
    let user = new User('test', '#ffffff', 'home');
    let command = new Command();
    command.whitelist = ['home'];
    expect(command.isWhitelisted(user)).toBe(true);
});
test('userCanRunCommand() works', () => {
    let user = new User('test', '#ffffff', 'home');
    let command = new Command();
    command.whitelist = ['home'];
    expect(command.userCanRunCommand(user)).toBe(true);
})