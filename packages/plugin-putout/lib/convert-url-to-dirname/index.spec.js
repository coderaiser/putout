import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/convert-url-to-dirname', plugin],
    ],
});

test('plugin-putout: convert-url-to-dirname: report: commonjs', (t) => {
    t.report('commonjs', `Use 'createTest(__dirname)' instead of 'createTest(import.meta.url)' in CommonJS'`);
    t.end();
});

test('plugin-putout: convert-url-to-dirname: transform: commonjs', (t) => {
    t.transform('commonjs');
    t.end();
});

test('plugin-putout: convert-url-to-dirname: no report: esm', (t) => {
    t.noReport('esm');
    t.end();
});

test('plugin-putout: convert-url-to-dirname: no report: dirname', (t) => {
    t.noReport('dirname');
    t.end();
});
