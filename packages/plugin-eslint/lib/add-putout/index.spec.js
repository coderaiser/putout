import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    'eslint/add-putout': plugin,
});

test('putout: plugin-eslint: add-putout: report', (t) => {
    t.report('add-putout', `Add 'putout' to 'plugins' and 'extends'`);
    t.end();
});

test('putout: plugin-eslint: add-putout: transform', (t) => {
    t.transform('add-putout');
    t.end();
});

test('putout: plugin-eslint: add-putout: no transform: includes', (t) => {
    t.noTransform('includes');
    t.end();
});

test('putout: plugin-eslint: add-putout: no report: no-plugins', (t) => {
    t.noReport('no-plugins');
    t.end();
});
