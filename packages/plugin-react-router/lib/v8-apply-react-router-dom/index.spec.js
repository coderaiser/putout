import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['v8-apply-react-router-dom', plugin],
    ],
});

test('react-router: v8-apply-react-router-dom: report', (t) => {
    t.report('v8-apply-react-router-dom', `Use 'react-router/dom' instead of 'react-router-dom'`);
    t.end();
});

test('react-router: v8-apply-react-router-dom: transform', (t) => {
    t.transform('v8-apply-react-router-dom');
    t.end();
});
