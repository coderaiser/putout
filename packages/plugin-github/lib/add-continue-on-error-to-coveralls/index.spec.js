import {createTest} from '@putout/test';
import plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['github/add-continue-on-error-to-coveralls', plugin],
    ],
});

test('plugin-github: add coveralls continue-on-error: report', (t) => {
    t.report('add-continue-on-error-to-coveralls', `Add 'continue-on-error' to 'coverallsapp/github-action'`);
    t.end();
});

test('plugin-github: add coveralls continue-on-error: transform', (t) => {
    t.transform('add-continue-on-error-to-coveralls');
    t.end();
});
