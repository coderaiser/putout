import {createTest} from '@putout/test';
import * as convertIoWriteToIoCreateDirectory from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cloudcmd/convert-io-write-to-io-create-directory', convertIoWriteToIoCreateDirectory],
    ],
});

test('cloudcmd: convert-io-write-to-io-create-directory: report: write', (t) => {
    t.report('write', 'IO.createDirectory should be used instead of IO.write');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform: write', (t) => {
    t.transform('write');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform: write-str', (t) => {
    t.transform('write-str');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: transform: write-template', (t) => {
    t.transform('write-template');
    t.end();
});

test('cloudcmd: convert-io-write-to-io-create-directory: no transform: no-suffix', (t) => {
    t.noTransform('no-suffix');
    t.end();
});
