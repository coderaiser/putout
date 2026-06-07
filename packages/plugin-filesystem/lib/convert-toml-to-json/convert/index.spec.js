import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-toml-to-json', (t) => {
    t.report('convert-toml-to-json', `Convert '*.toml' to '*.json'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-toml-to-json', (t) => {
    t.transform('convert-toml-to-json');
    t.end();
});
