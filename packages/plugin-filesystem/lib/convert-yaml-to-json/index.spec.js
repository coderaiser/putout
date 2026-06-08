import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-yaml-to-json', plugin],
    ],
});

test('putout: plugin-filesystem: convert-yaml-to-json: report', (t) => {
    t.reportWithOptions('convert-yaml-to-json', `Convert '*.yaml' to '*.json'`, {
        filename: 'actions.yaml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-yaml-to-json: transform with options', (t) => {
    t.transformWithOptions('convert-yaml-to-json', {
        filename: 'actions.yaml',
    });
    t.end();
});

test('putout: plugin-filesystem: convert-yaml-to-json: transform with options: yml', (t) => {
    t.transformWithOptions('yml', {
        filename: 'actions.yml',
    });
    t.end();
});
