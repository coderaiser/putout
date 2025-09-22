import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: no report: isArray', (t) => {
    t.noReportCode('isArray()');
    t.end();
});
