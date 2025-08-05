import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-dot-notation.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-dot-notation', plugin],
    ],
});

test('putout: apply-dot-notation: report', (t) => {
    t.report('apply-dot-notation', `Use dot notation: '["c"]' -> '.c'`);
    t.end();
});

test('putout: apply-dot-notation: transform', (t) => {
    t.transform('apply-dot-notation');
    t.end();
});

test('putout: apply-dot-notation: transform: valid', (t) => {
    t.transform('valid');
    t.end();
});

test('putout: apply-dot-notation: no transform: not-valid', (t) => {
    t.noTransform('not-valid');
    t.end();
});
