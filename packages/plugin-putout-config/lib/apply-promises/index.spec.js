import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-promises', plugin],
    ],
});

test('putout-config: apply-promises: report', (t) => {
    t.report('apply-promises', `Rename property: 'remove-useless-variables/await' -> 'promises/remove-useless-variables'`);
    t.end();
});

test('putout-config: apply-promises: transform', (t) => {
    t.transform('apply-promises');
    t.end();
});
