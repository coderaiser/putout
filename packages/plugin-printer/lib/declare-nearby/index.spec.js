import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare-nearby', plugin],
    ],
});

test('printer: declare-nearby: report', (t) => {
    t.report('declare-nearby', `Declare 'indent', it referenced but not defined`);
    t.end();
});

test('printer: declare-nearby: transform', (t) => {
    t.transform('declare-nearby');
    t.end();
});
