import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-plugins-element-to-tuple', plugin],
    ],
});

test('putout: convert-plugins-element-to-tuple: report', (t) => {
    t.report('convert-plugins-element-to-tuple', `Use 'tuple' instead of 'element'`);
    t.end();
});

test('putout: convert-plugins-element-to-tuple: transform', (t) => {
    t.transform('convert-plugins-element-to-tuple');
    t.end();
});
