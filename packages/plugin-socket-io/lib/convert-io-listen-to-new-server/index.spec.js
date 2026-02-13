import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-io-listen-to-new-server', plugin],
    ],
});

test('socket-io: convert-io-listen-to-new-server: report', (t) => {
    t.report('convert-io-listen-to-new-server', `Use 'new Server(server)' instead of 'io.listen(server)'`);
    t.end();
});

test('socket-io: convert-io-listen-to-new-server: transform', (t) => {
    t.transform('convert-io-listen-to-new-server');
    t.end();
});
