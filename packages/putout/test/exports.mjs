import test from 'supertape';

test('putout: exports', async (t) => {
    const parseOptions = await import('putout/parse-options');
    const internal = await import('../lib/parse-options/index.js');
    
    t.equal(parseOptions, internal);
    t.end();
});

test('putout: exports', async (t) => {
    const {OK} = await import('putout/exit-codes');
    
    t.equal(OK, 0);
    t.end();
});

