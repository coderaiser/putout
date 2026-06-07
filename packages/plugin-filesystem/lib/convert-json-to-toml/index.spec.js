import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-json-to-toml', plugin],
    ],
});

test('putout: plugin-filesystem: convert-json-to-toml: report', (t) => {
    t.reportWithOptions('convert-json-to-toml', `Convert '*.json' to '*.toml'`, {
        filename: 'bunfig.json',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-json-to-toml: transform with options', (t) => {
    t.transformWithOptions('convert-json-to-toml', {
        filename: 'bunfig.json',
    });
    t.end();
});
