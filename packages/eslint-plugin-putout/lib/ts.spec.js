'use strict';

const {test} = require('supertape');
const [, tsx] = require('./ts');

test('eslint-plugin-putout: ts: plugins', (t) => {
    const {plugins} = tsx;
    
    const expected = [
        '@typescript-eslint',
        '@stylistic/ts',
        'react',
        '@stylistic/jsx',
    ];
    
    t.deepEqual(plugins, expected);
    t.end();
});
