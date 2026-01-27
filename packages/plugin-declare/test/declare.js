import {createTest} from '@putout/test';
import montag from 'montag';
import * as declare from '../lib/index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['declare', declare],
    ],
});

test('putout: plugin: declare: report: assign', (t) => {
    t.report('assign', `Declare 'assign', it referenced but not defined`);
    t.end();
});

test('putout: plugin: declare: transform: assign', (t) => {
    t.transform('assign');
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

test('putout: plugin: declare: no transform with options: assign-dismiss', (t) => {
    t.noTransformWithOptions('assign-dismiss', {
        dismiss: [
            'assign',
            'stringify',
        ],
    });
    t.end();
});

test('putout: plugin: declare: transform with options: parse', (t) => {
    t.transformWithOptions('parse', {
        dismiss: [
            'assign',
            'stringify',
        ],
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

test('putout: plugin: declare: string', (t) => {
    t.transform('string');
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
        noop();\n
    `);
    t.end();
});

test('putout: plugin: declare: eslint', (t) => {
    t.transformCode('eslint();', montag`
        import {eslint} from 'putout/eslint';\n
        eslint();\n
    `);
    t.end();
});

test('putout: plugin: declare: once', (t) => {
    t.transformCode('once();', montag`
        import once from 'once';\n
        once();\n
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
        import pipe from 'pipe-io';\n
        await pipe([stream]);\n
    `);
    t.end();
});

test('putout: plugin: declare: pullout', (t) => {
    t.transformCode('await pullout(stream);', montag`
        import pullout from 'pullout';
        
        await pullout(stream);\n
    `);
    t.end();
});

test('putout: plugin: declare: returns', (t) => {
    t.transformCode(`returns('hello');`, montag`
        const returns = (a) => () => a;
        returns('hello');\n
    `);
    t.end();
});

test('putout: plugin: declare: undefined', (t) => {
    t.transform(`fixtures`);
    t.end();
});

test('putout: plugin: declare: chalk', (t) => {
    t.transformCode(`chalk.red('hello');`, montag`
        import chalk from 'chalk';\n
        chalk.red('hello');\n
    `);
    t.end();
});

test('putout: plugin: declare: table', (t) => {
    t.transformCode(`table(data);`, montag`
        import table from 'table';\n
        table(data);\n
    `);
    t.end();
});

test('putout: plugin: declare: fullstore', (t) => {
    t.transformCode(`fullstore(data);`, montag`
        import {fullstore} from 'fullstore';\n
        fullstore(data);\n
    `);
    t.end();
});

test('putout: plugin: declare: wait', (t) => {
    t.transformCode(`wait(console.log, 'hello');`, montag`
        import wait from '@iocmd/wait';\n
        wait(console.log, 'hello');\n
    `);
    t.end();
});

test('putout: plugin: declare: jessy', (t) => {
    t.transformCode(`jessy(object, 'hello');`, montag`
        import {jessy} from 'jessy';\n
        jessy(object, 'hello');\n
    `);
    t.end();
});

test('putout: plugin: declare: nessy', (t) => {
    t.transformCode(`nessy(object, 'hello');`, montag`
        import {nessy} from 'nessy';\n
        nessy(object, 'hello');\n
    `);
    t.end();
});
