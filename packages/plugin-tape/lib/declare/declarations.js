'use strict';

module.exports = {
    test: 'import {test} from "supertape"',
    stub: 'import {stub} from "supertape"',
    Test: 'import {Test} from "supertape"',
    Stub: 'import {Stub} from "supertape"',
    
    mockImport: `const {mockImport} = createMockImport(import.meta.url)`,
    mockRequire: `const mockRequire = require('mock-require')`,
    reImport: `const {reImport} = createMockImport(import.meta.url)`,
    stopAll: {
        esm: `const {stopAll} = createMockImport(import.meta.url)`,
        commonjs: `const {stopAll} = mockRequire`,
    },
    createMockImport: `import {createMockImport} from 'mock-import'`,
};
