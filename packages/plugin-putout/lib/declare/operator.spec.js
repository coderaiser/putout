import montag from 'montag';
import {createTest} from '@putout/test';
import * as declare from './index.js';

const test = createTest(import.meta.url, {
    plugins: [
        ['putout/declare', declare],
    ],
});

test('plugin-putout: declare: transform: operator: findFileUp', (t) => {
    t.transformCode(`findFileUp(root, 'package.json')`, montag`
        import {operator} from 'putout';
        
        const {findFileUp} = operator;
        findFileUp(root, 'package.json');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator: getFile', (t) => {
    t.transformCode(`getFile(root, 'package.json')`, montag`
        import {operator} from 'putout';
        
        const {getFile} = operator;
        getFile(root, 'package.json');
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator: getFileContent', (t) => {
    t.transformCode(`getFileContent(filePath)`, montag`
        import {operator} from 'putout';
        
        const {getFileContent} = operator;
        getFileContent(filePath);
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator: sortIgnore', (t) => {
    const source = montag`
        sortIgnore({
            name: '.npmignore'
        });
    `;
    
    t.transformCode(source, montag`
        import {operator} from 'putout';
        
        const {sortIgnore} = operator;
        
        sortIgnore({
            name: '.npmignore',
        });
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator: removeFiles', (t) => {
    const source = montag`
        removeFiles([
            '.npmignore'
        ]);
    `;
    
    t.transformCode(source, montag`
        import {operator} from 'putout';
        
        const {removeFiles} = operator;
        
        removeFiles(['.npmignore']);
    
    `);
    t.end();
});

test('plugin-putout: declare: transform: operator: renameProperty', (t) => {
    const source = montag`
        renameProperties([
            ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
        ]);
    `;
    
    t.transformCode(source, montag`
        import {operator} from 'putout';
        
        const {renameProperties} = operator;
        
        renameProperties([
            ['merge-duplicate-imports', 'esm/merge-duplicate-imports'],
        ]);
    
    `);
    t.end();
});
