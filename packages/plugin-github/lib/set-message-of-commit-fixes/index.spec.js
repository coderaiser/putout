import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['set-message-of-commit-fixes', plugin],
    ],
});

test('github: set-message-of-commit-fixes: report', (t) => {
    t.report('set-message-of-commit-fixes', `Set 'message' of 'Commit fixes'`);
    t.end();
});

test('github: set-message-of-commit-fixes: no report after transform', (t) => {
    t.noReportAfterTransform('set-message-of-commit-fixes');
    t.end();
});

test('github: set-message-of-commit-fixes: transform', (t) => {
    t.transform('set-message-of-commit-fixes');
    t.end();
});
