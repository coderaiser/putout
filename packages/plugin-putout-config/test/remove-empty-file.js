import {createTest} from '@putout/test';
import * as putoutConfig from '../lib/index.js';

const test = createTest(import.meta.url, {
    rules: {
        'putout-config/remove-empty-file': 'on',
    },
    plugins: [
        ['putout-config', putoutConfig],
    ],
});

test('plugin-nodejs: remove-empty-file: report', (t) => {
    t.report('remove-empty-file', `Remove empty '.putout.json'`);
    t.end();
});

test('plugin-nodejs: remove-empty-file: transform: remove-empty-file-on', (t) => {
    t.transform('remove-empty-file-on');
    t.end();
});
