import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['coverage/sort', plugin],
    ],
});

test('putout: plugin-coverage: sort-ignore: report', (t) => {
    t.report('sort-ignore', `Sort '.nycrc.json'`);
    t.end();
});

test('putout: plugin-coverage: sort-ignore: transform', (t) => {
    t.transform('sort-ignore');
    t.end();
});
