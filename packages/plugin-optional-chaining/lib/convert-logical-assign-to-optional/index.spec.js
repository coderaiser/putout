import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['assign', plugin],
    ],
});

test('apply-optional-chaining: assign: report', (t) => {
    t.report('assign', `Use optional expression ('a?.b = c') instead of 'condition' ('a && a.b = c')`);
    t.end();
});

test('apply-optional-chaining: assign: transform', (t) => {
    t.transform('assign');
    t.end();
});
