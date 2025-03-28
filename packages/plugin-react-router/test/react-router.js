import {createTest} from '@putout/test';
import * as reactRouter from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-router', reactRouter],
    ],
});

test('plugin-react-hooks: transform: v6-convert-switch-to-routes', (t) => {
    t.transform('v6-convert-switch-to-routes');
    t.end();
});

test('plugin-react-hooks: transform: v6-convert-component-to-element', (t) => {
    t.transform('v6-convert-component-to-element');
    t.end();
});

test('plugin-react-router: transform: v7-split-multi-segment-route', (t) => {
    t.transform('v7-split-multi-segment-route');
    t.end();
});
