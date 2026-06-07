import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert', plugin],
    ],
});

test('@putout/plugin-filesystem: convert: report: convert-yaml-to-toml', (t) => {
    t.report('convert-yaml-to-toml', `Convert '*.yaml' to '*.toml'`);
    t.end();
});

test('@putout/plugin-filesystem: convert: transform: convert-yaml-to-toml', (t) => {
    t.transform('convert-yaml-to-toml');
    t.end();
});
