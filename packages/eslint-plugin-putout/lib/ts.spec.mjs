import {test} from 'supertape';
import tsConfig from './ts.mjs';

const [, tsx] = tsConfig;

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

