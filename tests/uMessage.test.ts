import uMessage from '../lib/uMessage'

test('Can convert to HTML (rmtb)', () => {
    expect(uMessage('**Hello world**', 'rmtb')).toBe('<p><strong>Hello world</strong></p>');
})
test('Can convert to trollbox.party', () => {
    expect(uMessage('**Hello world**', 'trollbox.party')).toBe('**Hello world**');
})