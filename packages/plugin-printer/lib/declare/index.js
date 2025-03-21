import types from '@putout/plugin-putout/declare/types';

export const declare = () => ({
    createTest: `const {createTest} = require('#test')`,
    test: 'const {test} = createTest(__dirname)',
    fixture: 'const {fixture} = createTest(__dirname)',
    types: `import {types} from '@putout/babel'`,
    ...types,
});
