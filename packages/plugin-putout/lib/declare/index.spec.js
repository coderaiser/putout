'use strict';

const montag = require('montag');
const {createTest} = require('@putout/test');
const declare = require('.');

const test = createTest(__dirname, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: report', (t) => {
    t.report('compare', `Declare 'compare', it referenced but not defined`);
    t.end();
});

test('plugin-putout: declare: transform: compare', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: compare: second time', (t) => {
    t.transform('compare');
    t.end();
});

test('plugin-putout: declare: transform: contains', (t) => {
    t.transform('contains');
    t.end();
});

test('plugin-putout: declare: transform: traverse', (t) => {
    t.transform('traverse');
    t.end();
});

test('plugin-putout: declare: transform: operator', (t) => {
    t.transform('operator');
    t.end();
});

test('plugin-putout: declare: transform: types', (t) => {
    t.transform('types');
    t.end();
});

test('plugin-putout: declare: transform: template', (t) => {
    t.transform('template');
    t.end();
});

test('plugin-putout: declare: transform: declare', (t) => {
    t.transform('declare');
    t.end();
});

test('plugin-putout: declare: transform: get-template-values', (t) => {
    t.transform('get-template-values');
    t.end();
});

test('plugin-putout: declare: transform: regexp', (t) => {
    t.transform('regexp');
    t.end();
});

test('plugin-putout: declare: transform: add-args', (t) => {
    t.transform('add-args');
    t.end();
});

test('plugin-putout: declare: transform: replaceWith', (t) => {
    t.transformCode('replaceWith(a);', montag`
        import {operator} from 'putout';
        
        const {replaceWith} = operator;
        replaceWith(a);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: replaceWithMultiple', (t) => {
    t.transformCode('replaceWithMultiple(a);', montag`
        import {operator} from 'putout';
        
        const {replaceWithMultiple} = operator;
        replaceWithMultiple(a);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getProperties', (t) => {
    t.transformCode('getProperties(a, []);', montag`
        import {operator} from 'putout';
        
        const {getProperties} = operator;
        getProperties(a, []);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: isESM', (t) => {
    t.transformCode('isESM', montag`
        import {operator} from 'putout';
        
        const {isESM} = operator;
        isESM;\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: create-test', (t) => {
    t.transform('create-test');
    t.end();
});

test('plugin-putout: declare: transform: properties', (t) => {
    t.transform('properties');
    t.end();
});

test('plugin-putout: declare: transform: remove', (t) => {
    t.transformCode('remove();', montag`
        import {operator} from 'putout';
        
        const {remove} = operator;
        remove();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: extract', (t) => {
    t.transformCode('extract();', montag`
        import {operator} from 'putout';
        
        const {extract} = operator;
        extract();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getPathAfterImports', (t) => {
    t.transformCode('getPathAfterImports();', montag`
        import {operator} from 'putout';
        
        const {getPathAfterImports} = operator;
        getPathAfterImports();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: compute', (t) => {
    t.transformCode('compute();', montag`
        import {operator} from 'putout';
        
        const {compute} = operator;
        compute();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: rename', (t) => {
    t.transformCode('rename();', montag`
        import {operator} from 'putout';
        
        const {rename} = operator;
        rename();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: renameProperty', (t) => {
    t.transformCode('renameProperty();', montag`
        import {operator} from 'putout';
        
        const {renameProperty} = operator;
        renameProperty();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: insertBefore', (t) => {
    t.transformCode('insertBefore(a, b);', montag`
        import {operator} from 'putout';
        
        const {insertBefore} = operator;
        insertBefore(a, b);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: insertAfter', (t) => {
    t.transformCode('insertAfter(a, b);', montag`
        import {operator} from 'putout';
        
        const {insertAfter} = operator;
        insertAfter(a, b);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: setLiteralValue', (t) => {
    t.transformCode(`setLiteralValue(path, 'hello');`, montag`
        import {operator} from 'putout';
        
        const {setLiteralValue} = operator;
        setLiteralValue(path, 'hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: traverseProperties', (t) => {
    t.transformCode(`traverseProperties(path, 'hello');`, montag`
        import {operator} from 'putout';
        
        const {traverseProperties} = operator;
        traverseProperties(path, 'hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getRule', (t) => {
    const name = '`./${name}`';
    const source = montag`
        module.exports.rules = {
            ...getRule('remove-unused-variables'),
        }
    `;
    
    t.transformCode(source, montag`
        const getRule = (name, options = 'on') => ({
            [name]: [options, require(${name})],
        });
        
        module.exports.rules = {
            ...getRule('remove-unused-variables'),
        };\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getBinding', (t) => {
    t.transformCode(`getBinding('hello');`, montag`
        import {operator} from 'putout';
        
        const {getBinding} = operator;
        getBinding('hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getBindingPath', (t) => {
    t.transformCode(`getBindingPath('hello');`, montag`
        import {operator} from 'putout';
        
        const {getBindingPath} = operator;
        getBindingPath('hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: renameFile', (t) => {
    t.transformCode(`renameFile(filePath, 'hello.js');`, montag`
        import {operator} from 'putout';
        
        const {renameFile} = operator;
        renameFile(filePath, 'hello.js');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: removeFile', (t) => {
    t.transformCode(`removeFile(filePath, 'hello.js');`, montag`
        import {operator} from 'putout';
        
        const {removeFile} = operator;
        removeFile(filePath, 'hello.js');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: findFile', (t) => {
    t.transformCode(`findFile(path, 'hello.js');`, montag`
        import {operator} from 'putout';
        
        const {findFile} = operator;
        findFile(path, 'hello.js');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: moveFile', (t) => {
    t.transformCode(`moveFile(path, 'hello.js');`, montag`
        import {operator} from 'putout';
        
        const {moveFile} = operator;
        moveFile(path, 'hello.js');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: createDirectory', (t) => {
    t.transformCode(`createDirectory(path, 'hello');`, montag`
        import {operator} from 'putout';
        
        const {createDirectory} = operator;
        createDirectory(path, 'hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getParentDirectory', (t) => {
    t.transformCode(`getParentDirectory(path);`, montag`
        import {operator} from 'putout';
        
        const {getParentDirectory} = operator;
        getParentDirectory(path);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: readFileContent', (t) => {
    t.transformCode(`readFileContent(filePath);`, montag`
        import {operator} from 'putout';
        
        const {readFileContent} = operator;
        readFileContent(filePath);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: writeFileContent', (t) => {
    t.transformCode(`writeFileContent(filePath, 'hello');`, montag`
        import {operator} from 'putout';
        
        const {writeFileContent} = operator;
        writeFileContent(filePath, 'hello');\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: matchFiles', (t) => {
    t.transformCode(`matchFiles();`, montag`
        import {operator} from 'putout';
        
        const {matchFiles} = operator;
        matchFiles();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: ignore', (t) => {
    t.transformCode(`ignore();`, montag`
        import {operator} from 'putout';
        
        const {ignore} = operator;
        ignore();\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getPathAfterRequires', (t) => {
    t.transformCode(`getPathAfterRequires(path);`, montag`
        import {operator} from 'putout';
        
        const {getPathAfterRequires} = operator;
        getPathAfterRequires(path);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: getLiteralRaw', (t) => {
    t.transformCode(`getLiteralRaw(path);`, montag`
        import {operator} from 'putout';
        
        const {getLiteralRaw} = operator;
        getLiteralRaw(path);\n
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator-json', (t) => {
    t.transform('operator-json');
    t.end();
});

test('plugin-putout: declare: transform: operator-filesystem', (t) => {
    t.transform('operator-filesystem');
    t.end();
});
