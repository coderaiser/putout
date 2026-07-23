const result = fixture.jsxTemplateFix;
t.equal(result, `${code}\n`);

{
    const expected = {
        hello: 'world',
    };
    t.equal(result, expected);
}
{
    const expected = [{
        x: 'hello',
    }];
    t.deepEqual(rows, expected);
}
