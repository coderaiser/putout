import {createTest} from '@putout/test';
import {montag} from 'montag';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-assertions-order', plugin],
    ],
});

test('tape: apply-assertions-order: report', (t) => {
    const result = 'apply-assertions-order';
    const expected = montag`
        Use 'cleanup();' before 't.equal(onShareButtonClick.callCount, 1);'
    `;
    
    t.report(result, expected);
    t.end();
});

test('tape: apply-assertions-order: transform', (t) => {
    t.transform('apply-assertions-order');
    t.end();
});

test('tape: apply-assertions-order: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});

test('tape: apply-assertions-order: no report: no-prev', (t) => {
    t.noReport('no-prev');
    t.end();
});

test('tape: apply-assertions-order: no report: no-t', (t) => {
    t.noReport('no-t');
    t.end();
});
