import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-arrow-to-declaration', plugin],
    ],
});

test('cloudcmd: convert-arrow-to-declaration: report', (t) => {
    t.report('convert-arrow-to-declaration', `Use 'declaration' instead 'arrow' for 'init/show/hide'`);
    t.end();
});

test('cloudcmd: convert-arrow-to-declaration: transform', (t) => {
    t.transform('convert-arrow-to-declaration');
    t.end();
});
