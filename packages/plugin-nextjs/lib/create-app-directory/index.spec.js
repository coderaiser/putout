import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['create-app-directory', plugin],
    ],
});

test('packages: create-app-directory: report', (t) => {
    t.report('create-app-directory', `Create 'app' directory`);
    t.end();
});

test('packages: create-app-directory: transform', (t) => {
    t.transform('create-app-directory');
    t.end();
});
