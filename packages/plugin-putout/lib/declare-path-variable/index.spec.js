import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare-path-variable', plugin],
    ],
});

test('putout: declare-path-variable: report', (t) => {
    t.report('declare-path-variable', `Declare 'path' variable`);
    t.end();
});

test('putout: declare-path-variable: transform', (t) => {
    t.transform('declare-path-variable');
    t.end();
});
