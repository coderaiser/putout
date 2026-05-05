import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        [
            'convert-namespace-to-default-in-react-test-renderer',
            plugin,
        ],
    ],
});

test('react: convert-namespace-to-default-in-react-test-renderer: report', (t) => {
    t.report('convert-namespace-to-default-in-react-test-renderer', `Use 'reactTestRenderer' instead of '{createRenderer}'`);
    t.end();
});

test('react: convert-namespace-to-default-in-react-test-renderer: transform', (t) => {
    t.transform('convert-namespace-to-default-in-react-test-renderer');
    t.end();
});
