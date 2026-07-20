import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['v7-apply-memory-router', plugin],
    ],
});

test('react-router: v7-apply-memory-router: report', (t) => {
    t.report('v7-apply-memory-router', `Import 'MemoryRouter' from 'react-router'`);
    t.end();
});

test('react-router: v7-apply-memory-router: transform', (t) => {
    t.transform('v7-apply-memory-router');
    t.end();
});
