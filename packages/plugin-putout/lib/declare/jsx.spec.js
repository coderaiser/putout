import montag from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: jsx: hasTagName', (t) => {
    t.transformCode(`hasTagName(path, 'li')`, montag`
        import {operator} from 'putout';
        
        const {hasTagName} = operator;
        hasTagName(path, 'li');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: getAttributePath', (t) => {
    t.transformCode(`getAttributePath(path, 'className')`, montag`
        import {operator} from 'putout';
        
        const {getAttributePath} = operator;
        getAttributePath(path, 'className');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: getAttributeNode', (t) => {
    t.transformCode(`getAttributeNode(path, 'className')`, montag`
        import {operator} from 'putout';
        
        const {getAttributeNode} = operator;
        getAttributeNode(path, 'className');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: getAttributeValue', (t) => {
    t.transformCode(`getAttributeValue(path, 'className')`, montag`
        import {operator} from 'putout';
        
        const {getAttributeValue} = operator;
        getAttributeValue(path, 'className');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: addAttributeValue', (t) => {
    t.transformCode(`addAttributeValue(path, 'className', 'hello')`, montag`
        import {operator} from 'putout';
        
        const {addAttributeValue} = operator;
        addAttributeValue(path, 'className', 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: removeAttributeValue', (t) => {
    t.transformCode(`removeAttributeValue(path, 'className', 'hello')`, montag`
        import {operator} from 'putout';
        
        const {removeAttributeValue} = operator;
        removeAttributeValue(path, 'className', 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: setAttributeValue', (t) => {
    t.transformCode(`setAttributeValue(path, 'className', 'hello')`, montag`
        import {operator} from 'putout';
        
        const {setAttributeValue} = operator;
        setAttributeValue(path, 'className', 'hello');
    
    `);
    t.end();
});
