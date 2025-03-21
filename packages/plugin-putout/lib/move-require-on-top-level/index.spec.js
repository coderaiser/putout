import {createTest} from '@putout/test';
import * as moveRequireOnTopLevel from './index.js';
import * as applyFixtureNameToMessage from '../apply-fixture-name-to-message/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/move-require-on-top-level', moveRequireOnTopLevel],
    ],
});

test('plugin-putout: move-require-on-top-level: report: require', (t) => {
    t.report('require', 'Move require on top level');
    t.end();
});

test('plugin-putout: move-require-on-top-level: transform: require', (t) => {
    t.transform('require');
    t.end();
});

test('plugin-putout: move-require-on-top-level: transform: identifier', (t) => {
    t.transform('identifier');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: top-level', (t) => {
    t.noTransform('top-level');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: member-expression', (t) => {
    t.noTransform('member-expression');
    t.end();
});

test('plugin-putout: move-require-on-top-level: no transform: not-require', (t) => {
    t.noTransform('not-require');
    t.end();
});

test('plugin-putout: move-require-on-top-level: transform: apply-fixture-name-to-message', (t) => {
    t.transform('apply-fixture-name-to-message', {
        'apply-fixture-name-to-message': applyFixtureNameToMessage,
    });
    t.end();
});
