test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    t.transformCode(code, code);
    t.end();
});

