import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nested', plugin],
    ],
});

test('@putout/plugin-remove-useless-spread: nested: report', (t) => {
    t.report('nested', `Remove useless nested spread`);
    t.end();
});

test('@putout/plugin-remove-useless-spread: nested: transform', (t) => {
    t.transform('nested');
    t.end();
});

test('@putout/plugin-remove-useless-spread: nested: no transform: call', (t) => {
    t.noTransform('call');
    t.end();
});
