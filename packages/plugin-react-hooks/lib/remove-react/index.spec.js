import {createTest} from '@putout/test';
import * as remove from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['remove-react', remove],
    ],
});

test('plugin-react-hooks: remove-react: report', (t) => {
    t.report('remove-react', `Remove unused 'React' variable`);
    t.end();
});

test('plugin-react-hooks: remove-react: transform', (t) => {
    t.transform('remove-react', '\n');
    t.end();
});

test('plugin-react-hooks: remove-react: transform: star', (t) => {
    t.transform('star', '\n');
    t.end();
});

test('plugin-react-hooks: remove-react: no transform: used', (t) => {
    t.noTransform('used');
    t.end();
});

test('plugin-react-hooks: remove-react: transform: couple', (t) => {
    t.transform('couple');
    t.end();
});
