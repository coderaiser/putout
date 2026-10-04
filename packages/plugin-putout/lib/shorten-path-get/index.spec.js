import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['shorten-path-get', plugin],
    ],
});

test('putout: shorten-path-get: report', (t) => {
    t.report('shorten-path-get', `Shorten 'path.get()'`);
    t.end();
});

test('putout: shorten-path-get: transform', (t) => {
    t.transform('shorten-path-get');
    t.end();
});
