import {createTest} from '@putout/test';
import * as removeStopAll from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['tape/remove-stop-all', removeStopAll],
    ],
});

test('plugin-tape: remove-stop-all: report: stop-all', (t) => {
    t.report('stop-all', `Remove 'stopAll()' when you not calling 'reImport()'`);
    t.end();
});

test('plugin-tape: remove-stop-all: transform: stop-all', (t) => {
    t.transform('stop-all');
    t.end();
});

test('plugin-tape: remove-stop-all: transform: async', (t) => {
    t.transform('async');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: re-import', (t) => {
    t.noTransform('re-import');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: re-require', (t) => {
    t.noTransform('re-require');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: mock-require', (t) => {
    t.noTransform('mock-require');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: mock-import', (t) => {
    t.noTransform('mock-import');
    t.end();
});

test('plugin-tape: remove-stop-all: no transform: trace-import', (t) => {
    t.noTransform('trace-import');
    t.end();
});
