import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['add-places-to-compare-places', plugin],
    ],
});

test('putout: add-places-to-compare-places: report: add-places-to-compare-places', (t) => {
    t.report('add-places-to-compare-places', `Add 'places' array to 'comparePlaces()'`);
    t.end();
});

test('putout: add-places-to-compare-places: transform: add-places-to-compare-places', (t) => {
    t.transform('add-places-to-compare-places');
    t.end();
});
