import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['v7-remove-useless-server', plugin],
    ],
});

test('react-router: v7-remove-useless-server: report', (t) => {
    t.report('v7-remove-useless-server', `'react-router-dom/server' -> 'react-router-dom'`);
    t.end();
});

test('react-router: v7-remove-useless-server: transform', (t) => {
    t.transform('v7-remove-useless-server');
    t.end();
});
