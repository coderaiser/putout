import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['npmignore/sort', plugin],
    ],
});

test('putout: plugin-npmignore: sort: report: sort-ignore', (t) => {
    t.report('sort', `Sort '.npmignore'`);
    t.end();
});

test('putout: plugin-npmignore: sort: transform: sort-ignore', (t) => {
    t.transform('sort');
    t.end();
});

test('putout: plugin-npmignore: sort: transform: no-hidden', (t) => {
    t.transform('no-hidden');
    t.end();
});

test('putout: sort-ignore: no report after transform: sort', (t) => {
    t.noReportAfterTransform('sort');
    t.end();
});
