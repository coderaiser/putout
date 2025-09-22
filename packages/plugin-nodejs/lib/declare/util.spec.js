import {createTest} from 'node:@putout/test';
import * as declare from 'node:./index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: no report: isArray', (t) => {
    t.noReportCode('isArray()');
    t.end();
});
