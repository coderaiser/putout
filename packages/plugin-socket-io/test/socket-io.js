import {createTest} from '@putout/test';
import * as socketIO from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['socket-io', socketIO],
    ],
});

test('plugin-react: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-socket-io: transform: convert-io-listen-to-new-server', (t) => {
    t.transform('convert-io-listen-to-new-server');
    t.end();
});
