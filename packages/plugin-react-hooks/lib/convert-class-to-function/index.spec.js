import {createTest} from '@putout/test';
import * as convertClassToFunction from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-class-to-function', convertClassToFunction],
    ],
});

test('plugin-react-hooks: convert-class-to-function: report: class', (t) => {
    t.report('class', 'class FormLoginContainer should be a function');
    t.end();
});

test('plugin-react-hooks: convert-class-to-function: transform: class', (t) => {
    t.transform('class');
    t.end();
});

test('plugin-react-hooks: convert-class-to-function: no transform: will-mount', (t) => {
    t.noTransform('will-mount');
    t.end();
});
