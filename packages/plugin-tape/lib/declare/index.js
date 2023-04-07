'use strict';

module.exports.declare = () => ({
    test: 'import {test} from "supertape"',
    stub: 'import {stub} from "supertape"',
    Test: 'import {Test} from "supertape"',
    Stub: 'import {Stub} from "supertape"',
    mockImport: `const {mockImport} = createMockImport(import.meta.url)`,
    reImport: `const {reImport} = createMockImport(import.meta.url)`,
    mockRequire: `import mockRequire from 'mock-require'`,
    reRequire: `const {reRequire} = mockRequire`,
    stopAll: {
        esm: `const {stopAll} = createMockImport(import.meta.url)`,
        commonjs: `const {stopAll} = mockRequire`,
    },
    createMockImport: `import {createMockImport} from 'mock-import'`,
});
