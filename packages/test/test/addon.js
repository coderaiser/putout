import * as variables from '@putout/plugin-variables';
import * as removeConsole from './fixture/remove-console.js';
import {createTest} from '../lib/test.js';

const removeUnused = variables.rules['remove-unused'];

const test = createTest(import.meta.url, {
    plugins: {
        'remove-console': removeConsole,
    },
});

test('test: addon: transform', (t) => {
    t.transform('var', '\n', {
        'remove-unused-variable': removeUnused,
    });
    t.end();
});
