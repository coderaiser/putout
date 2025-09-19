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

test('plugin-putout: declare: transform: jsx: getClassName', (t) => {
    t.transformCode(`getClassName(path, 'hello')`, montag`
        import {operator} from 'putout';
        
        const {getClassName} = operator;
        getClassName(path, 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: addClassName', (t) => {
    t.transformCode(`addClassName(path, 'hello')`, montag`
        import {operator} from 'putout';
        
        const {addClassName} = operator;
        addClassName(path, 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: removeClassName', (t) => {
    t.transformCode(`removeClassName(path, 'hello')`, montag`
        import {operator} from 'putout';
        
        const {removeClassName} = operator;
        removeClassName(path, 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: containsClassName', (t) => {
    t.transformCode(`containsClassName(path, 'hello')`, montag`
        import {operator} from 'putout';
        
        const {containsClassName} = operator;
        containsClassName(path, 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: hasDataName', (t) => {
    t.transformCode(`hasDataName(path, 'hello')`, montag`
        import {operator} from 'putout';
        
        const {hasDataName} = operator;
        hasDataName(path, 'hello');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: hasAttribute', (t) => {
    t.transformCode(`hasAttributeValue(path, 'data-menu-index', '1')`, montag`
        import {operator} from 'putout';
        
        const {hasAttributeValue} = operator;
        hasAttributeValue(path, 'data-menu-index', '1');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: jsx: addAttribute', (t) => {
    t.transformCode(`addAttribute(path, 'data-menu-index', '1')`, montag`
        import {operator} from 'putout';
        
        const {addAttribute} = operator;
        addAttribute(path, 'data-menu-index', '1');
    
    `);
    t.end();
});
