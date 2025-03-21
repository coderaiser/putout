import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-dirname-to-url', plugin],
    ],
});

test('plugin-putout: convert-dirname-to-url: report: dirname', (t) => {
    t.report('dirname', `Use 'createTest(import.meta.url)' instead of 'createTest(__dirname)'`);
    t.end();
});

test('plugin-putout: convert-dirname-to-url: transform: dirname', (t) => {
    t.transform('dirname');
    t.end();
});

test('plugin-putout: convert-dirname-to-url: no transform: commonjs', (t) => {
    t.noTransform('commonjs');
    t.end();
});
