import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-toml-to-yaml', plugin],
    ],
});

test('putout: plugin-filesystem: convert-toml-to-yaml: report', (t) => {
    t.reportWithOptions('convert-toml-to-yaml', `Convert '*.toml' to '*.yaml'`, {
        filename: 'bunfig.toml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-toml-to-yaml: transform with options', (t) => {
    t.transformWithOptions('convert-toml-to-yaml', {
        filename: 'bunfig.toml',
    });
    t.end();
});
