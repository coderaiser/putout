test('palabra: borrar', (t) => {
    const result = borrar(['hello', 'world'], {
        directorio: '~/.local/share',
    });
    
    const expected = [
        'rm rf ~/.local/share/hello',
        'rm rf ~/.local/bin/hello',
        'rm rf ~/.local/share/world',
        'rm rf ~/.local/bin/world',
    ].join(' && ');
    
    t.equal(result, expected);
    t.end();
});
