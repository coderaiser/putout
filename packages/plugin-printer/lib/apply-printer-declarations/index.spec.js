import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-printer-declarations', plugin],
    ],
});

test('printer: apply-printer-declarations: report', (t) => {
    t.report('apply-printer-declarations', `Destructure from 'printer' variable instead of argument`);
    t.end();
});

test('printer: apply-printer-declarations: transform', (t) => {
    t.transform('apply-printer-declarations');
    t.end();
});
