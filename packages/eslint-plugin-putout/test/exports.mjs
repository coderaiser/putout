import {test} from 'supertape';

test('eslint-plugin-putout: exports: rules', async (t) => {
    const {rules} = await import('eslint-plugin-putout');
    const internal = await import('../lib/index.mjs');
    
    t.equal(rules, internal.rules);
    t.end();
});
