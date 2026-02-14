import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['coverage/sort', plugin],
    ],
});

test('putout: plugin-coverage: sort: report', (t) => {
    t.report('sort', `Sort '.nycrc.json'`);
    t.end();
});

test('putout: plugin-coverage: sort: transform', (t) => {
    t.transform('sort');
    t.end();
});
