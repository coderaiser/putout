import {createTest} from '@putout/test';
import * as staticBlock from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-empty/static-block', staticBlock],
    ],
});

test('plugin-remove-empty: static-block: report', (t) => {
    t.report('static-block', 'Avoid useless empty static blocks');
    t.end();
});

test('plugin-remove-empty: static-block: transform', (t) => {
    t.transform('static-block');
    t.end();
});
