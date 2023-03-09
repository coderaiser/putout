'use strict';

const {createTest} = require('@putout/test');
const montag = require('montag');

const declare = require('..');

const test = createTest(__dirname, {
    declare,
});

test('putout: plugin: declare: report: assign', (t) => {
    t.report('assign', `Declare 'assign'`);
    t.end();
});

test('putout: plugin: declare: transform: assign', (t) => {
    t.transform('assign');
    t.end();
});

test('putout: plugin: declare: transform: is-array', (t) => {
    t.transform('is-array');
    t.end();
});

test('putout: plugin: declare: transform: keys', (t) => {
    t.transform('keys');
    t.end();
});

test('putout: plugin: declare: transform: values', (t) => {
    t.transform('values');
    t.end();
});

test('putout: plugin: declare: transform: assign-dismiss', (t) => {
    t.noTransformWithOptions('assign-dismiss', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});

test('putout: plugin: declare: transform: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: ['assign', 'stringify'],
    });
    t.end();
});

test('putout: plugin: declare: no report after transform: assign', (t) => {
    t.noReportAfterTransform('assign');
    t.end();
});

test('putout: plugin: declare: object', (t) => {
    t.transform('object');
    t.end();
});

test('putout: plugin: declare: putout', (t) => {
    t.transform('putout');
    t.end();
});

test('putout: plugin: declare: currify', (t) => {
    t.transform('currify');
    t.end();
});

test('putout: plugin: declare: wraptile', (t) => {
    t.transform('wraptile');
    t.end();
});

test('putout: plugin: declare: wrap', (t) => {
    t.transform('wrap');
    t.end();
});

test('putout: plugin: declare: fresh-import', (t) => {
    t.transform('fresh-import');
    t.end();
});

test('putout: plugin: declare: noop', (t) => {
    t.transformCode('noop();', montag`
        const noop = () => {};
        noop();
    `);
    t.end();
});

test('putout: plugin: declare: eslint', (t) => {
    t.transformCode('eslint();', montag`
        import eslint from 'putout/eslint';
        eslint();
    `);
    t.end();
});

test('putout: plugin: declare: once', (t) => {
    t.transformCode('once();', montag`
        import once from 'once';
        once();
    `);
    t.end();
});

test('putout: plugin: declare: options-declarations', (t) => {
    t.transformWithOptions('options-declarations', {
        declarations: {
            custom: `const custom= require('custom')`,
        },
    });
    t.end();
});

test('putout: plugin: declare: pipe', (t) => {
    t.transformCode('await pipe([stream]);', montag`
        import pipe from 'pipe-io';
        await pipe([stream]);
    `);
    t.end();
});

test('putout: plugin: declare: pullout', (t) => {
    t.transformCode('await pullout(stream);', montag`
        import pullout from 'pullout';
        await pullout(stream);
    `);
    t.end();
});

test('putout: plugin: declare: simport: commonjs', (t) => {
    t.transformCode(`await simport('fs');`, montag`
        import {createSimport} from 'simport';
        const simport = createSimport(__filename);
        await simport('fs');
    `);
    t.end();
});

test('putout: plugin: declare: simport: esm', (t) => {
    t.transformCode(`import {readFile} from 'fs'; await simport('fs');`, montag`
        import {readFile} from 'fs';
        import {createSimport} from 'simport';
        const simport = createSimport(import.meta.url);
        await simport('fs');
    `);
    t.end();
});

test('putout: plugin: declare: returns', (t) => {
    t.transformCode(`returns('hello');`, montag`
        const returns = a => () => a;
        returns('hello');
    `);
    t.end();
});

test('putout: plugin: declare: readFixture', (t) => {
    t.transform(`fixtures`);
    t.end();
});

test('putout: plugin: declare: chalk', (t) => {
    t.transformCode(`chalk.red('hello');`, montag`
        import chalk from 'chalk';
        chalk.red('hello');
    `);
    t.end();
});

test('putout: plugin: declare: table', (t) => {
    t.transformCode(`table(data);`, montag`
        import table from 'table';
        table(data);
    `);
    t.end();
});

test('putout: plugin: declare: fullstore', (t) => {
    t.transformCode(`fullstore(data);`, montag`
        import fullstore from 'fullstore';
        fullstore(data);
    `);
    t.end();
});

