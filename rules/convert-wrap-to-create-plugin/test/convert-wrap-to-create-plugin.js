import {createTest} from '@putout/test';
import * as convertTraverseToInclude from '../lib/convert-wrap-to-create-plugin.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-wrap-to-create-plugin', convertTraverseToInclude],
    ],
});

test('putout: rules: convert-wrap-to-create-plugin: report', (t) => {
    t.report('convert-wrap-to-create-plugin', `Use 'createPlugin()' instead of 'wrap()'`);
    t.end();
});

test('putout: rules: convert-wrap-to-create-plugin: transform', (t) => {
    t.transform('convert-wrap-to-create-plugin');
    t.end();
});
