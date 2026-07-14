import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-assertions-order', plugin],
    ],
});

test('tape: apply-assertions-order: report', (t) => {
    t.report('apply-assertions-order', `Use 'cleanup();' before 't.equal(onShareButtonClick.callCount, 1);'`);
    t.end();
});

test('tape: apply-assertions-order: transform', (t) => {
    t.transform('apply-assertions-order');
    t.end();
});
