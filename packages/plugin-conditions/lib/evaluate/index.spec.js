import {createTest} from '@putout/test';
import * as evaluate from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['conditions/evaluate', evaluate],
    ],
});

test('conditions: evaluate: report', (t) => {
    t.report('evaluate', 'Avoid useless conditions');
    t.end();
});

test('conditions: evaluate: transform: evaluate ', (t) => {
    t.transform('evaluate');
    t.end();
});

test('conditions: evaluate: transform: false', (t) => {
    t.transform('false');
    t.end();
});
