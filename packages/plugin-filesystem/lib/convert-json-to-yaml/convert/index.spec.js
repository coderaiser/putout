import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-json-to-yaml', (t) => {
    t.report('convert-json-to-yaml', `Convert '*.json' to '*.yaml'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-json-to-yaml', (t) => {
    t.transform('convert-json-to-yaml');
    t.end();
});
