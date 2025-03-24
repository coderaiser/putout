import {createTest} from '@putout/test';
import * as convertComponentToUseState from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-component-to-use-state', convertComponentToUseState],
    ],
});

test('plugin-react-hooks: convert-component-to-use-state: report: component', (t) => {
    t.report('component', 'useState should be used instead of Component');
    t.end();
});

test('plugin-react-hooks: convert-component-to-use-state: transform: component', (t) => {
    t.transform('component');
    t.end();
});
