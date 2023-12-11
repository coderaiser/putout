const {source} = await transformSource(code, context);
const expected = Buffer.from(`\n`);

t.deepEqual(source, expected);
t.end();
