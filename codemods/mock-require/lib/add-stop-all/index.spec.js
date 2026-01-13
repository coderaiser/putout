import {createTest} from '@putout/test';
import * as addStopAll from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['mock-require/add-stop-all', addStopAll],
    ],
});

test('plugin-mock-require: add-stop-all: report: mock-import', (t) => {
    t.report('mock-import', `Call 'stopAll()' at the end of test when 'mockImport()' used`);
    t.end();
});

test('plugin-mock-require: add-stop-all: transform: mock-import', (t) => {
    t.transform('mock-import');
    t.end();
});

test('plugin-mock-require: add-stop-all: transform: mock-require', (t) => {
    t.transform('mock-require');
    t.end();
});

test('plugin-mock-require: add-stop-all: no transform: no-assertions', (t) => {
    t.noTransform('no-assertions');
    t.end();
});

test('plugin-mock-require: add-stop-all: no transform: no-mock-import', (t) => {
    t.noTransform('no-mock-import');
    t.end();
});

test('plugin-mock-require: add-stop-all: transform: many-assertions', (t) => {
    t.transform('many-assertions');
    t.end();
});

test('plugin-mock-require: add-stop-all: transform: async', (t) => {
    t.transform('async');
    t.end();
});
