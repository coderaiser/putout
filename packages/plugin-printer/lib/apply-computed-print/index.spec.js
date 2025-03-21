import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['printer/apply-computed-print', plugin],
    ],
});

test('plugin-printer: apply-computed-print: report', (t) => {
    t.report('apply-computed-print', `Use print('__path') instead of path.get(__path)`);
    t.end();
});

test('plugin-printer: apply-computed-print: transform', (t) => {
    t.transform('apply-computed-print');
    t.end();
});
