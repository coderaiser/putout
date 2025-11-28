import {createTest} from '@putout/test';
import montag from 'montag';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['nodejs/declare', declare],
    ],
});

test('putout: plugin: nodejs: declare: report: readable-simple', (t) => {
    t.report('readable-simple', `Declare 'Readable', it referenced but not defined`);
    t.end();
});

test('putout: plugin: nodejs: declare: transform: join', (t) => {
    t.transform('join');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: readable', (t) => {
    t.transform('readable');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: readable-simple', (t) => {
    t.transform('readable-simple');
    t.end();
});

test('putout: plugin: nodejs: declare: transform: read-file', (t) => {
    t.transform('read-file');
    t.end();
});

test('putout: plugin: nodejs: declare: no report after transform: join', (t) => {
    t.noReportAfterTransform('join');
    t.end();
});

test('putout: plugin: nodejs: declare: fs', (t) => {
    t.transform('fs');
    t.end();
});

test('putout: plugin: nodejs: declare: zlib', (t) => {
    t.transform('zlib');
    t.end();
});

test('putout: plugin: nodejs: declare: module', (t) => {
    t.transform('module');
    t.end();
});

test('putout: plugin: nodejs: declare: os', (t) => {
    t.transform('os');
    t.end();
});

test('putout: plugin: nodejs: declare: child_process', (t) => {
    t.transform('child_process');
    t.end();
});

test('putout: plugin: nodejs: declare: stream', (t) => {
    t.transform('stream');
    t.end();
});

test('putout: plugin: nodejs: declare: nodejs: url', (t) => {
    t.transformCode(`pathToFileURL(path);`, montag`
        import {pathToFileURL} from 'node:url';
        
        pathToFileURL(path);
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: nodejs: util', (t) => {
    t.transformCode(`promisify(fn);`, montag`
        import {promisify} from 'node:util';
        
        promisify(fn);
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: nodejs: styleText', (t) => {
    t.transformCode(`styleText('red', 'hello');`, montag`
        import {styleText} from 'node:util';
        
        styleText('red', 'hello');
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: process: cwd', (t) => {
    t.transformCode(`cwd();`, montag`
        import {cwd} from 'node:process';
        
        cwd();
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: process: env', (t) => {
    t.transformCode(`const a = env.DEBUG;`, montag`
        import {env} from 'node:process';
        
        const a = env.DEBUG;
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: no transform: promises', (t) => {
    t.noTransformCode(`promises.filter();\n`);
    t.end();
});

test('putout: plugin: nodejs: declare: no transform: version', (t) => {
    t.noTransformCode(`version;\n`);
    t.end();
});

test('putout: plugin: nodejs: declare: events', (t) => {
    t.transformCode(`new EventEmitter();`, montag`
        import {EventEmitter} from 'node:events';
        
        new EventEmitter();
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: process', (t) => {
    t.transformCode(`process.exit();`, montag`
        import process from 'node:process';
        
        process.exit();
    
    `);
    t.end();
});

test('putout: plugin: nodejs: declare: no report: types', (t) => {
    t.noReportCode(`const {x} = types`);
    t.end();
});

test('putout: plugin: nodejs: declare: no report: assert', (t) => {
    t.noReportCode(`assert`);
    t.end();
});
