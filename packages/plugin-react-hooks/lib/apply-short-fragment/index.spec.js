import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-hooks/apply-short-fragment', plugin],
    ],
});

test('plugin-react-hooks: apply-short-fragment: report', (t) => {
    t.report('apply-short-fragment', `Apply shorthand syntax for 'Fragment'`);
    t.end();
});

test('plugin-react-hooks: apply-short-fragment: transform', (t) => {
    t.transform('apply-short-fragment');
    t.end();
});

test('plugin-react-hooks: apply-short-fragment: no transform: member', (t) => {
    t.noTransform('member');
    t.end();
});
