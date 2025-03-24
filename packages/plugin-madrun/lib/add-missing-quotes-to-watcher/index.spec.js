import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-missing-quotes-to-watcher', plugin],
    ],
});

test('madrun: add-missing-quotes-to-watcher: report', (t) => {
    t.report('add-missing-quotes-to-watcher', `Add missing quotes to watcher`);
    t.end();
});

test('madrun: add-missing-quotes-to-watcher: transform', (t) => {
    t.transform('add-missing-quotes-to-watcher');
    t.end();
});

test('madrun: add-missing-quotes-to-watcher: no report: c8', (t) => {
    t.noReport('c8');
    t.end();
});
