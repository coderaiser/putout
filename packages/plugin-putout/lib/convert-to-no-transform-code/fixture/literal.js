test('conosle.log', (t) => {
    t.transformCode('console.log', '');
    t.end();
});
