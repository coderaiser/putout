import {createTest} from '@putout/test';
import * as removeUselessAssign from '../lib/remove-useless-assign.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-useless-assign', removeUselessAssign],
    ],
});

test('plugin-remove-useless-assign: report: assign', (t) => {
    t.report('assign', `Avoid useless 'Object.assign()'`);
    t.end();
});

test('plugin-remove-useless-assign: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('plugin-remove-useless-assign: no transform: spread', (t) => {
    t.noTransform('spread');
    t.end();
});
