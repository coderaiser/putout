const {source} = await transformSource(code, context);
const expected = Buffer.from(`\n`);

t.equal(source, expected);
t.end();
