import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-router/convert-component-to-element', plugin],
    ],
});

test('plugin-react-router: convert-component-to-element: report', (t) => {
    t.report('convert-component-to-element', `Use 'element' instead of 'component'`);
    t.end();
});

test('plugin-react-router: convert-component-to-element: transform', (t) => {
    t.transform('convert-component-to-element');
    t.end();
});
