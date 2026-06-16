import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-contents-permissions', plugin],
    ],
});

test('github: set-contents-permissions: report', (t) => {
    t.report('set-contents-permissions', `'permissions.content = write'`);
    t.end();
});

test('github: set-contents-permissions: transform', (t) => {
    t.transform('set-contents-permissions');
    t.end();
});

test('github: set-contents-permissions: transform: contents-none', (t) => {
    t.transform('contents-none');
    t.end();
});
