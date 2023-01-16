'use strict';

const {createTest} = require('@putout/test');
const plugin = require('.');

const test = createTest(__dirname, {
    'cloudcmd/convert-load-dir-to-change-dir': plugin,
});

test('cloudcmd/convert-load-dir-to-change-dir: report', (t) => {
    t.report('convert-load-dir-to-change-dir', `Use 'CloudCmd.changeDir()' instead of 'CloudCmd.loadDir()'`);
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform', (t) => {
    t.transform('convert-load-dir-to-change-dir');
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform: not-member', (t) => {
    t.transform('not-member');
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform: member-one-property', (t) => {
    t.transform('member-one-property');
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform: first-object', (t) => {
    t.transform('first-object');
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform: not-member-one-property', (t) => {
    t.transform('not-member-one-property');
    t.end();
});

test('cloudcmd/convert-load-dir-to-change-dir: transform: not-member-couple-properties', (t) => {
    t.transform('not-member-couple-properties');
    t.end();
});
