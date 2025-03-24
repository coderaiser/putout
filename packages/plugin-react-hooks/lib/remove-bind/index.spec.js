import {createTest} from '@putout/test';
import * as removeBind from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-bind', removeBind],
    ],
});

test('plugin-react-hooks: remove-bind: report: bind', (t) => {
    t.report('bind', `bind should not be used`);
    t.end();
});

test('plugin-react-hooks: remove-bind: transform: bind', (t) => {
    t.transform('bind');
    t.end();
});
