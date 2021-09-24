'use strict';

const nodeJS = require('./node-js.js');
const object = require('./object');

module.exports = {
    ...object,
    
    isArray: 'const {isArray} = Array',
    
    parse: 'const {parse} = JSON',
    stringify: 'const {stringify} = JSON',
    
    ...nodeJS,
    tryCatch: `import tryCatch from 'try-catch'`,
    tryToCatch: `import tryToCatch from 'try-to-catch'`,
    
    montag: `import montag from 'montag'`,
    
    mockImport: `const {mockImport} = createMockImport(import.meta.url)`,
    reImport: `const {reImport} = createMockImport(import.meta.url)`,
    stopAll: `const {stopAll} = createMockImport(import.meta.url)`,
    createMockImport: `import {createMockImport} from 'mock-import';`,
};
