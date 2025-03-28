import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['v7-split-multi-segment-route', plugin],
    ],
});

test('react-router: v7-split-multi-segment-route: report', (t) => {
    t.report('v7-split-multi-segment-route', `Split multi-segment splat <Route`);
    t.end();
});

test('react-router: v7-split-multi-segment-route: transform', (t) => {
    t.transform('v7-split-multi-segment-route');
    t.end();
});

test('react-router: v7-split-multi-segment-route: transform: object', (t) => {
    t.transform('object');
    t.end();
});
