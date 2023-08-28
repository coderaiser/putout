import {createTest} from '@putout/test';
import * as setHomepage from '../lib/set-description.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['set-description', setHomepage],
    ],
});

test('rules: set-description: report', (t) => {
    t.report('description', 'Set 🐊 in description');
    t.end();
});

test('rules: set-description: transform', (t) => {
    t.transform('description');
    t.end();
});

test('rules: set-description: no report', (t) => {
    t.noReport('no-description');
    t.end();
});
