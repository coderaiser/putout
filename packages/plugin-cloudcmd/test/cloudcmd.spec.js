import {createTest} from '@putout/test';
import * as cloudcmd from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cloudcmd', cloudcmd],
    ],
});

test('cloudcmd: IO.mv: report: mv', (t) => {
    t.report('mv', 'IO.move should be used instead of IO.mv');
    t.end();
});

test('cloudcmd: IO.cp: report: cp', (t) => {
    t.report('cp', 'IO.copy should be used instead of IO.cp');
    t.end();
});

test('cloudcmd: IO.mv: transform: mv', (t) => {
    t.transform('mv');
    t.end();
});

test('cloudcmd: IO.cp: transform: cp', (t) => {
    t.transform('cp');
    t.end();
});

test('cloudcmd: IO.write: transform: write', (t) => {
    t.transform('write');
    t.end();
});

test('cloudcmd: convert-load-dir-to-change-dir: transform', (t) => {
    t.transform('convert-load-dir-to-change-dir');
    t.end();
});
