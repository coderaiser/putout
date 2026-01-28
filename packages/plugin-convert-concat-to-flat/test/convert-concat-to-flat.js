import {createTest} from '@putout/test';
import * as convertConcatToFlat from '../lib/convert-concat-to-flat.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-concat-to-flat', convertConcatToFlat],
    ],
});

test('plugin-convert-concat-to-flat: report: concat', (t) => {
    t.report('concat', '"flat" should be used instead of "concat"');
    t.end();
});

test('plugin-convert-concat-to-flat: transform: concat', (t) => {
    t.transform('concat');
    t.end();
});
