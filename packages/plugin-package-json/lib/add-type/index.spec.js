import {createTest} from '@putout/test';
import * as removeNyc from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['package-json/add-type', removeNyc],
    ],
});

test('putout: plugin-package-json: add-type: report', (t) => {
    t.report('no-type', `Add 'type' of module to 'package.json'`);
    t.end();
});

test('putout: plugin-package-json: add-type: transform', (t) => {
    t.transform('no-type');
    t.end();
});

test('putout: plugin-package-json: add-type: no transform: module', (t) => {
    t.noTransform('module');
    t.end();
});

test('putout: plugin-package-json: add-type: no transform: commonjs', (t) => {
    t.noTransform('commonjs');
    t.end();
});

test('putout: plugin-package-json: add-type: no transform: no-version', (t) => {
    t.noTransform('no-version');
    t.end();
});
