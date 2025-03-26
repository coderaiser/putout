import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-json-to-js', (t) => {
    t.report('convert-json-to-js', `Convert '*.json' to '*.js'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-json-to-js', (t) => {
    t.transform('convert-json-to-js');
    t.end();
});
