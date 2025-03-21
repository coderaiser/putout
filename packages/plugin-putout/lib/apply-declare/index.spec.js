import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/apply-declare', plugin],
    ],
});

test('plugin-tape: apply-declare: report: declare', (t) => {
    t.report('declare', `Use 'Declarator' instead of 'operator.declare()'`);
    t.end();
});

test('plugin-tape: declare', (t) => {
    t.transform('declare');
    t.end();
});
