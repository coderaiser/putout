import {createTest} from '@putout/test';
import * as rmUnused from '@putout/plugin-remove-unused-variables';
import * as reactHooks from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['react-hooks', reactHooks],
    ],
});

test('plugin-react-hooks: transform: react-hooks', (t) => {
    t.transform('react-hooks', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: react-component', (t) => {
    t.transform('react-component', {
        'remove-unused-variables': rmUnused,
    });
    t.end();
});

test('plugin-react-hooks: transform: not-react', (t) => {
    t.transform('not-react');
    t.end();
});

test('plugin-react-hooks: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-react-hooks: transform: apply-short-fragment', (t) => {
    t.transform('apply-short-fragment');
    t.end();
});

test('plugin-react-hooks: transform: remove-react', (t) => {
    t.transform('remove-react', '\n');
    t.end();
});
