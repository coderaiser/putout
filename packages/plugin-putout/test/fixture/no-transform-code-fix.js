test('plugin-apply-destructuring: transform: array: destructuring', (t) => {
    const code = 'const {name} = array[0]';
    t.noTransformCode(code);
    t.end();
});
