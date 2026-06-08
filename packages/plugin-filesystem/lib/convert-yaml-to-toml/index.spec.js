import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-yaml-to-toml', plugin],
    ],
});

test('putout: plugin-filesystem: convert-yaml-to-toml: report', (t) => {
    t.reportWithOptions('convert-yaml-to-toml', `Convert '*.yaml' to '*.toml'`, {
        filename: 'bunfig.yaml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-yaml-to-toml: transform with options', (t) => {
    t.transformWithOptions('convert-yaml-to-toml', {
        filename: 'bunfig.yaml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-yaml-to-toml: transform with options: yml', (t) => {
    t.transformWithOptions('yml', {
        filename: 'bunfig.yml',
    });
    t.end();
});
