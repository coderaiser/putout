import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-filesystem', plugin],
    ],
});

test('putout-config: apply-filesystem: report', (t) => {
    t.report('apply-filesystem', `Rename property: 'filesystem/remove-travis-yml' -> 'filesystem/remove-file'`);
    t.end();
});

test('putout-config: apply-filesystem: transform', (t) => {
    t.transform('apply-filesystem');
    t.end();
});
