import {createTest} from '@putout/test';
import * as setHomepage from '../lib/set-description.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-description', setHomepage],
    ],
});

test('rules: set-description: report: description', (t) => {
    t.report('description', 'Set 🐊 in description');
    t.end();
});

test('rules: set-description: transform: description', (t) => {
    t.transform('description');
    t.end();
});

test('rules: set-description: no report: no-description', (t) => {
    t.noReport('no-description');
    t.end();
});
