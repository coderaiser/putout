import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-coverage', plugin],
    ],
});

test('putout-config: apply-coverage: report', (t) => {
    t.report('apply-coverage', `Rename property: 'filesystem/remove-nyc-output' -> 'coverage/remove-files'`);
    t.end();
});

test('putout-config: apply-coverage: transform', (t) => {
    t.transform('apply-coverage');
    t.end();
});
