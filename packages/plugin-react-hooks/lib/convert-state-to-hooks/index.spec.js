import {createTest} from '@putout/test';
import * as convertStateToHooks from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['convert-state-to-hooks', convertStateToHooks],
    ],
});

test('plugin-react-hooks: convert state tot hooks: report: react-hooks', (t) => {
    t.report('react-hooks', 'hooks should be used instead of this.state');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: transform: react-hooks', (t) => {
    t.transform('react-hooks');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: no transform: assignment', (t) => {
    t.noTransform('assignment');
    t.end();
});

test('plugin-react-hooks: convert state to hooks: no transform: declare', (t) => {
    t.noTransform('declare');
    t.end();
});
