import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-toml-to-json', plugin],
    ],
});

test('putout: plugin-filesystem: convert-toml-to-json: report', (t) => {
    t.reportWithOptions('convert-toml-to-json', `Convert '*.toml' to '*.json'`, {
        filename: 'bunfig.toml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-toml-to-json: transform with options', (t) => {
    t.transformWithOptions('convert-toml-to-json', {
        filename: 'bunfig.toml',
    });
    t.end();
});
