import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['change-require', plugin],
    ],
});

test('putout: nodejs: apply-privately-required-file: no report: change-require', (t) => {
    t.noReport('change-require');
    t.end();
});

test('putout: nodejs: apply-privately-required-file: report: change-require', (t) => {
    t.reportWithOptions('change-require', ``, {
        from: './a',
        to: './a.js',
    });
    t.end();
});

test('putout: nodejs: apply-privately-required-file: transform with options: change-require', (t) => {
    t.transformWithOptions('change-require', {
        from: './a',
        to: './a.js',
    });
    t.end();
});
