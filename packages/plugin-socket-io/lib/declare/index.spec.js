import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['socket-io/declare', declare],
    ],
});

test('plugin-socket-io: declare: report: server', (t) => {
    t.report('server', `Declare 'Server', it referenced but not defined`);
    t.end();
});

test('plugin-socket-io: declare: transform: server', (t) => {
    t.transform('server');
    t.end();
});
