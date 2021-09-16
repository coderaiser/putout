import test from 'supertape';

test('putout: exports: putout/parse-options', async (t) => {
    const parseOptions = await import('putout/parse-options');
    const internal = await import('../lib/parse-options/index.js');
    
    t.equal(parseOptions, internal);
    t.end();
});

test('putout: exports: putout/exit-codes', async (t) => {
    const {OK} = await import('putout/exit-codes');
    
    t.equal(OK, 0);
    t.end();
});

test('putout: exports: putout/eslint', async (t) => {
    const eslint = await import('putout/eslint');
    const internal = await import('../lib/cli/eslint/index.js');
    
    t.equal(eslint, internal);
    t.end();
});

