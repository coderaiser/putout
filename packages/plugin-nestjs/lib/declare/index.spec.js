import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare', plugin],
    ],
});

test('nestjs: declare: report', (t) => {
    t.report('declare', `Declare 'Controller', it referenced but not defined`);
    t.end();
});

test('nestjs: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});
