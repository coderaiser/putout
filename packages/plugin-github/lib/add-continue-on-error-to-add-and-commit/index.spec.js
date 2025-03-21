import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['github/add-continue-on-error-to-add-and-commit', plugin],
    ],
});

test('plugin-github: add continue-on-error to add-and-commit: report: add-continue-on-error-to-add-and-commit', (t) => {
    t.report('add-continue-on-error-to-add-and-commit', `Add 'continue-on-error' to 'EndBug/add-and-commit'`);
    t.end();
});

test('plugin-github: continue-on-error to add-and-commit: transform: add-continue-on-error-to-add-and-commit', (t) => {
    t.transform('add-continue-on-error-to-add-and-commit');
    t.end();
});
