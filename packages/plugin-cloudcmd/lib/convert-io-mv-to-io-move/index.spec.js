import {createTest} from '@putout/test';
import * as convertIoMvToIoMove from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['cloudcmd/convert-io-mv-to-io-move', convertIoMvToIoMove],
    ],
});

test('cloudcmd: convert-io-mv-to-io-move: IO.mv: report: mv', (t) => {
    t.report('mv', 'IO.move should be used instead of IO.mv');
    t.end();
});

test('cloudcmd: convert-io-mv-to-io-move: IO.mv: transform: mv', (t) => {
    t.transform('mv');
    t.end();
});
