import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['arguments/apply-json-parse', plugin],
    ],
});

test('putout: plugin-arguments: apply-json-parse: report', (t) => {
    t.report('apply-json-parse', `Avoid useless arguments in 'JSON.parse()'`);
    t.end();
});

test('putout: plugin-arguments: apply-json-parse: transform', (t) => {
    t.transform('apply-json-parse');
    t.end();
});
