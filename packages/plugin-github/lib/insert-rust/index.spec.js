import {createTest} from '@putout/test';
import * as plugin from './index.js';

const test = createTest(import.meta.url, {
    printer: 'putout',
    plugins: [
        ['insert-rust', plugin],
    ],
});

test('putout: plugin-github: insert-rust: report', (t) => {
    t.report('insert-rust', `Install Rust`);
    t.end();
});

test('putout: plugin-github: insert-rust: transform', (t) => {
    t.transform('insert-rust');
    t.end();
});
