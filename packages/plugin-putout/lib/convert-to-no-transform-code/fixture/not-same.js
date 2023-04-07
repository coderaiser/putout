test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const name = array[0]';
    const fix = 'const [name] = array';
    
    t.transformCode(code, fix);
    t.end();
});
