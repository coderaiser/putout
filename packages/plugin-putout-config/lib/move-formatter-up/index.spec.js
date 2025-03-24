import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['move-formatter-up', plugin],
    ],
});

test('packages: move-formatter-up: report', (t) => {
    t.report('move-formatter-up', `Move 'formatter' up`);
    t.end();
});

test('packages: move-formatter-up: transform', (t) => {
    t.transform('move-formatter-up');
    t.end();
});

test('packages: move-formatter-up: no report: printer', (t) => {
    t.noReport('printer');
    t.end();
});
