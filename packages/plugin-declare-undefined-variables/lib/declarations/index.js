'use strict';

const {template} = require('putout');
const lazyAST = (a) => () => template.ast(a);
const nodeJS = require('./node-js.js');
const object = require('./object');

module.exports = {
    ...object,
    
    isArray: lazyAST('const {isArray} = Array'),
    
    parse: lazyAST('const {parse} = JSON'),
    stringify: lazyAST('const {stringify} = JSON'),
    
    ...nodeJS,
    tryCatch: lazyAST(`import tryCatch from 'try-catch'`),
    tryToCatch: lazyAST(`import tryToCatch from 'try-to-catch'`),
    
    montag: lazyAST(`import montag from 'montag'`),
    
    mockImport: lazyAST(`const {mockImport} = createMockImport(import.meta.url)`),
    reImport: lazyAST(`const {reImport} = createMockImport(import.meta.url)`),
    stopAll: lazyAST(`const {stopAll} = createMockImport(import.meta.url)`),
    createMockImport: lazyAST(`import {createMockImport} from 'mock-import';`),
};
