import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-hoisted', plugin],
    ],
});

test('vitest: apply-hoisted: report', (t) => {
    t.report('apply-hoisted', `Use 'vi.hoisted()'`);
    t.end();
});

test('vitest: apply-hoisted: transform', (t) => {
    t.transform('apply-hoisted');
    t.end();
});
