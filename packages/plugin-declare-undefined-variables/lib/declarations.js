'use strict';

const {template} = require('putout');
const lazyAST = (a) => () => template.ast(a);

module.exports = {
    'assign': lazyAST('const {assign} = Object'),
    'entries': lazyAST('const {entries} = Object'),
    'keys': lazyAST('const {keys} = Object'),
    'values': lazyAST('const {values} = Object'),
    
    'parse': lazyAST('const {parse} = JSON'),
    'stringify': lazyAST('const {stringify} = JSON'),
    
    'basename': lazyAST(`import {basename} from 'path'`),
    'extname': lazyAST(`import {extname} from 'path'`),
    'dirname': lazyAST(`import {dirname} from 'path'`),
    'join': lazyAST(`import {join} from 'path'`),
    
    'Readable.from': lazyAST(`import {Readable} from 'stream'`),
    'readFile': lazyAST(`import {readFile} from 'fs/promises'`),
    
    'tryCatch': lazyAST(`import tryCatch from 'try-catch'`),
    'tryToCatch': lazyAST(`import tryToCatch from 'try-to-catch'`),
    
    'montag': lazyAST(`import montag from 'montag'`),
    
    'mockImport': lazyAST(`const {mockImport} = createMockImport(import.meta.url)`),
    'reImport': lazyAST(`const {reImport} = createMockImport(import.meta.url)`),
    'stopAll': lazyAST(`const {stopAll} = createMockImport(import.meta.url)`),
    'createMockImport': lazyAST(`import {createMockImport} from 'mock-import';`),
};
