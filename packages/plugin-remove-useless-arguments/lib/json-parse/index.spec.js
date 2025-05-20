import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['json-parse', plugin],
    ],
});

test('remove-useless-arguments: json-parse: report', (t) => {
    t.report('json-parse', `Avoid useless arguments in 'JSON.parse()'`);
    t.end();
});

test('remove-useless-arguments: json-parse: transform', (t) => {
    t.transform('json-parse');
    t.end();
});
