import {createTest} from '@putout/test';
import * as addArgs from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/includer', addArgs],
    ],
});

test('plugin-putout: includer: report', (t) => {
    t.report('includer', 'Includer functions should return array (https://git.io/Jyndl)');
    t.end();
});

test('plugin-putout: includer: transform', (t) => {
    t.transform('includer');
    t.end();
});

test('plugin-putout: includer: transform: esm', (t) => {
    t.transform('esm');
    t.end();
});

test('plugin-putout: includer: transform: not-fn', (t) => {
    t.transform('not-fn');
    t.end();
});
