import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-desturcturing', plugin],
    ],
});

test('putout: plugin-putout: apply-desturcturing: report', (t) => {
    t.report('apply-desturcturing', `Destructure 'putout' in CommonJS`);
    t.end();
});

test('putout: plugin-putout: apply-desturcturing: transform', (t) => {
    t.transform('apply-desturcturing');
    t.end();
});
