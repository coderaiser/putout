import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-to-object', plugin],
    ],
});

test('putout: convert-to-object: report', (t) => {
    t.report('convert-to-object', `Convert 'label' to 'object'`);
    t.end();
});

test('putout: convert-to-object: transform', (t) => {
    t.transform('convert-to-object');
    t.end();
});

test('putout: convert-to-object: no report: no-label', (t) => {
    t.noReport('no-label');
    t.end();
});
