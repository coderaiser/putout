import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-router/convert-switch-to-routes', plugin],
    ],
});

test('plugin-react-router: convert-switch-to-routes: report', (t) => {
    t.report('convert-switch-to-routes', `Use 'Routes' instead of 'Switch'`);
    t.end();
});

test('plugin-react-router: convert-switch-to-routes: transform', (t) => {
    t.transform('convert-switch-to-routes');
    t.end();
});
