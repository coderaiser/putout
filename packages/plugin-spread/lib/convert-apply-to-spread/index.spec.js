import {createTest} from '@putout/test';
import * as convertApplyToSpread from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['spread/convert-apply-to-spread', convertApplyToSpread],
    ],
});

test('putout: plugin-spread: convert-apply-to-spread: report: apply', (t) => {
    t.report('apply', `Use 'spread' instead of 'apply'`);
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: apply', (t) => {
    t.transform('apply');
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: no apply', (t) => {
    const code = 'a(a, b);\n';
    
    t.noTransformCode(code);
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: call', (t) => {
    const code = 'a.call(a, b);\n';
    
    t.noTransformCode(code);
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: context', (t) => {
    const code = 'a.apply(b, c);\n';
    
    t.noTransformCode(code);
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: this', (t) => {
    t.transform('this');
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: member-expression', (t) => {
    t.transform('member-expression');
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: null', (t) => {
    t.transform('null');
    t.end();
});

test('putout: plugin-spread: convert-apply-to-spread: transform: prototype', (t) => {
    t.transform('prototype');
    t.end();
});
