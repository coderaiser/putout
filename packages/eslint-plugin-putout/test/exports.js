import {test} from 'supertape';

const {keys} = Object;

test('eslint-plugin-putout: exports: rules', async (t) => {
    const {rules} = await import('eslint-plugin-putout');
    const internal = await import('../lib/plugin.js');
    
    t.equal(rules, internal.rules);
    t.end();
});

test('eslint-plugin-putout: exports: default', async (t) => {
    const result = await import('eslint-plugin-putout');
    const internal = await import('../lib/plugin.js');
    
    t.equal(result.default, internal);
    t.end();
});

test('eslint-plugin-putout: exports: configs', async (t) => {
    const {configs} = await import('eslint-plugin-putout');
    const result = keys(configs);
    
    const expected = [
        'recommended',
        'jsx',
        'safe',
        'safeAlign',
    ];
    
    t.deepEqual(result, expected);
    t.end();
});
