import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-parens', plugin],
    ],
});

test('putout: apply-parens: report', (t) => {
    t.report('apply-parens', `Use 'removeParens(path)' instead of 'path.node.extra'`);
    t.end();
});

test('putout: apply-parens: report: add-parens', (t) => {
    t.report('add-parens', `Use 'addParens(path)' instead of 'path.node.extra'`);
    t.end();
});

test('putout: apply-parens: report: has-parens', (t) => {
    t.report('has-parens', `Use 'hasParens(path)' instead of 'path.node.extra'`);
    t.end();
});

test('putout: apply-parens: transform', (t) => {
    t.transform('apply-parens');
    t.end();
});

test('putout: apply-parens: transform: object', (t) => {
    t.transform('object');
    t.end();
});
