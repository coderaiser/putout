import {createTest} from '@putout/test';
import * as removePutout from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['madrun/remove-putout', removePutout],
    ],
});

test('madrun: remove putout: report: putout', (t) => {
    t.report('putout', `scripts should not have a name "putout", because "putout" is "lint"`);
    t.end();
});

test('madrun: remove putout: transform: putout', (t) => {
    t.transform('putout');
    t.end();
});

test('madrun: remove putout: no transform: no-putout', (t) => {
    t.noTransform('no-putout');
    t.end();
});

test('madrun: remove putout: no transform: computed', (t) => {
    t.noTransform('computed');
    t.end();
});
