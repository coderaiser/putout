import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['github/update-actions', plugin],
    ],
});

test('plugin-github: update-actions: report: set-coveralls-version', (t) => {
    t.report('set-coveralls-version', `Update action 'actions/checkout' to latest version`);
    t.end();
});

test('plugin-github: update-actions: transform: set-coveralls-version', (t) => {
    t.transform('set-coveralls-version');
    t.end();
});

test('plugin-github: update-actions: transform: docker-login', (t) => {
    t.transform('docker-login');
    t.end();
});

test('plugin-github: update-actions: transform: cache', (t) => {
    t.transform('cache');
    t.end();
});

test('plugin-github: update-actions: transform: bun', (t) => {
    t.transform('bun');
    t.end();
});

test('plugin-github: update-actions: transform with options: options', (t) => {
    t.transformWithOptions('options', {
        actions: {
            hello: 'v13',
        },
    });
    t.end();
});
