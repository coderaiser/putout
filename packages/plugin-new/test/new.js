import {createTest} from '@putout/test';
import * as pluginNew from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['new', pluginNew],
    ],
});

test('plugin-new: report: new', (t) => {
    t.report('new', `Add missing operator 'new'`);
    t.end();
});

test('plugin-new: transform: new', (t) => {
    t.transform('new');
    t.end();
});
