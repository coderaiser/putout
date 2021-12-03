'use strict';

const nodeJS = require('./node-js');
const object = require('./object');
const isType = require('./is-type');
const maybe = require('./maybe');
const logical = require('./logical');

module.exports = {
    ...nodeJS,
    ...object,
    ...isType,
    ...maybe,
    ...logical,
    
    isArray: 'const {isArray} = Array',
    
    parse: 'const {parse} = JSON',
    stringify: 'const {stringify} = JSON',
    
    noop: 'const noop = () => {}',
    
    tryCatch: `import tryCatch from 'try-catch'`,
    tryToCatch: `import tryToCatch from 'try-to-catch'`,
    
    montag: `import montag from 'montag'`,
    once: `import once from 'once'`,
    putout: `import putout from 'putout'`,
    eslint: `import eslint from 'putout/eslint'`,
    currify: `import currify from 'currify'`,
    wraptile: `import wraptile from 'wraptile'`,
    pipe: `import pipe from 'pipe-io'`,
    pullout: `import pullout from 'pullout'`,
    
    mockImport: `const {mockImport} = createMockImport(import.meta.url)`,
    reImport: `const {reImport} = createMockImport(import.meta.url)`,
    stopAll: `const {stopAll} = createMockImport(import.meta.url)`,
    createMockImport: `import {createMockImport} from 'mock-import';`,
};
