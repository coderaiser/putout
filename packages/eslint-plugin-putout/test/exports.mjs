import {test} from 'supertape';

test('eslint-plugin-putout: exports: rules', async (t) => {
    const {rules} = await import('eslint-plugin-putout');
    const internal = await import('../lib/index.mjs');
    
    t.equal(rules, internal.rules);
    t.end();
});

test('eslint-plugin-putout: exports: default', async (t) => {
    const result = await import('eslint-plugin-putout');
    const internal = await import('../lib/plugin.mjs');
    
    t.equal(result.default, internal);
    t.end();
});
