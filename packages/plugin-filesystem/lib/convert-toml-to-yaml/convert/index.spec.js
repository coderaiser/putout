import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-toml-to-yaml', (t) => {
    t.report('convert-toml-to-yaml', `Convert '*.toml' to '*.yaml'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-toml-to-yaml', (t) => {
    t.transform('convert-toml-to-yaml');
    t.end();
});
