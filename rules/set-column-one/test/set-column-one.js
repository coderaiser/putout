import {createTest} from '@putout/test';
import * as plugin from '../lib/set-column-one.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-column-one', plugin],
    ],
});

test('putout: set-column-one: report', (t) => {
    t.report('set-column-one', `Set 'column: 1' instead of 'column: 0'`);
    t.end();
});

test('putout: set-column-one: transform', (t) => {
    t.transform('set-column-one');
    t.end();
});
