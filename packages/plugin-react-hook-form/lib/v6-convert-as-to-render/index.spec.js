import {createTest} from '@putout/test';
import * as convertAsToRender from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-as-to-render', convertAsToRender],
    ],
});

test('plugin-react-hook-form: convert-as-to-render: report', (t) => {
    t.report('convert-as-to-render', `Use 'render' instead of 'as' in '<Control/>' elements`);
    t.end();
});

test('plugin-react-hook-form: convert-as-to-render: no report: no-as', (t) => {
    t.noReport('no-as');
    t.end();
});

test('plugin-react-hook-form: convert-as-to-render: transform', (t) => {
    t.transform('convert-as-to-render');
    t.end();
});

test('plugin-react-hook-form: convert-as-to-render: transform: nested', (t) => {
    t.transform('nested');
    t.end();
});

test('plugin-react-hook-form: convert-as-to-render: transform: spread', (t) => {
    t.transform('spread');
    t.end();
});

test('plugin-react-hook-form: convert-as-to-render: transform: name-control-rules-as', (t) => {
    t.transform('name-control-rules-as');
    t.end();
});
