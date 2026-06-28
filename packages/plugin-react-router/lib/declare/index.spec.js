import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare', plugin],
    ],
});

test('react-router: declare: report', (t) => {
    t.report('declare', `Declare 'Link', it referenced but not defined`);
    t.end();
});

test('react-router: declare: transform', (t) => {
    t.transform('declare');
    t.end();
});
