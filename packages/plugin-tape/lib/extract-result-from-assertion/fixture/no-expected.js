const result = fixture.jsxTemplateFix;
t.equal(result, `${code}\n`);

t.equal(result, {
    hello: 'world',
});

t.deepEqual(rows, [{
    x: 'hello',
}]);

