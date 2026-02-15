import {createTest} from '@putout/test';
import * as npmignore from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['npmignore', npmignore],
    ],
});

test('plugin-npmignore: report: npmignore', (t) => {
    t.report('npmignore', `Add '.*' to '.npmignore'`);
    t.end();
});

test('plugin-npmignore: transform: npmignore', (t) => {
    t.transform('npmignore');
    t.end();
});

test('plugin-npmignore: transform: config', (t) => {
    t.transform('config');
    t.end();
});

test('plugin-npmignore: transform: exists', (t) => {
    t.transform('exists');
    t.end();
});

test('plugin-npmignore: transform with options: options', (t) => {
    t.transformWithOptions('options', {
        dismiss: ['coverage'],
    });
    t.end();
});

test('plugin-npmignore: transform: sort', (t) => {
    t.transform('sort');
    t.end();
});
