import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-name-to-is-identifier', plugin],
    ],
});

test('putout: apply-name-to-is-identifier: report', (t) => {
    t.report('apply-name-to-is-identifier', `Use \`{name: 'hello'}\` instead of 'hello'`);
    t.end();
});

test('putout: apply-name-to-is-identifier: transform', (t) => {
    t.transform('apply-name-to-is-identifier');
    t.end();
});
