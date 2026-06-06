import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-json-to-yaml', plugin],
    ],
});

test('putout: plugin-filesystem: convert-json-to-yaml: report', (t) => {
    t.reportWithOptions('convert-json-to-yaml', `Convert '*.json' to '*.yaml'`, {
        filename: 'actions.json',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-json-to-yaml: transform with options', (t) => {
    t.transformWithOptions('convert-json-to-yaml', {
        filename: 'actions.json',
    });
    t.end();
});
