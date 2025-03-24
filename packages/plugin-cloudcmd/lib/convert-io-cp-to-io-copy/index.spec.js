import {createTest} from '@putout/test';
import * as convertIoCpToIoCopy from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cloudcmd/convert-io-cp-to-io-copy', convertIoCpToIoCopy],
    ],
});

test('cloudcmd: convert-io-cp-to-io-copy: IO.cp: report: cp', (t) => {
    t.report('cp', 'IO.copy should be used instead of IO.cp');
    t.end();
});

test('cloudcmd: convert-io-cp-to-io-copy: IO.cp: transform: cp', (t) => {
    t.transform('cp');
    t.end();
});
