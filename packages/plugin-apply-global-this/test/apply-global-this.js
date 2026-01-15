import {createTest} from '@putout/test';
import * as plugin from '../lib/apply-global-this.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-global-this', plugin],
    ],
});

test('putout: apply-global-this: report', (t) => {
    t.report('apply-global-this', `Use 'globalThis' instead of 'global'`);
    t.end();
});

test('putout: apply-global-this: report: window', (t) => {
    t.report('window', `Use 'globalThis' instead of 'window'`);
    t.end();
});

test('putout: apply-global-this: report: variable', (t) => {
    t.report('variable', `Use 'globalThis' instead of 'self'`);
    t.end();
});

test('putout: apply-global-this: transform', (t) => {
    t.transform('apply-global-this');
    t.end();
});

test('putout: apply-global-this: transform: window', (t) => {
    t.transform('window');
    t.end();
});

test('putout: apply-global-this: transform: self', (t) => {
    t.transform('self');
    t.end();
});
