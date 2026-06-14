import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-dependencies-status-badge', plugin],
    ],
});

test('markdown: remove-dependencies-status-badge: report', (t) => {
    t.report('remove-dependencies-status-badge', `Avoid 'dependencies' status badge`);
    t.end();
});

test('markdown: remove-dependencies-status-badge: transform', (t) => {
    t.transform('remove-dependencies-status-badge');
    t.end();
});
