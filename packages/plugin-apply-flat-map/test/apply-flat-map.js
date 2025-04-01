import {createTest} from '@putout/test';
import * as applyFlatMap from '../lib/apply-flat-map.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['apply-flat-map', applyFlatMap],
    ],
});

test('plugin-apply-flat-map: report: map', (t) => {
    t.report('map', `Use '.flatMap()' instead of '.map().flat()'`);
    t.end();
});

test('plugin-apply-flat-map: transform: map', (t) => {
    t.transform('map');
    t.end();
});
