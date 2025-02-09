'use strict';

const filesystem = require('./filesystem');
const json = require('./json');
const keyword = require('./keyword');
const parens = require('./parens');

module.exports = {
    ...filesystem,
    ...json,
    ...keyword,
    ...parens,
    operator: `import {operator} from 'putout'`,
    compare: 'const {compare} = operator',
    compareAll: 'const {compareAll} = operator',
    compareAny: 'const {compareAny} = operator',
    compute: 'const {compute} = operator',
    contains: 'const {contains} = operator',
    declare: 'const {declare} = operator',
    rename: 'const {rename} = operator',
    renameProperty: 'const {renameProperty} = operator',
    extract: 'const {extract} = operator',
    getLiteralRaw: 'const {getLiteralRaw} = operator',
    getPathAfterImports: 'const {getPathAfterImports} = operator',
    getPathAfterRequires: 'const {getPathAfterRequires} = operator',
    getBinding: 'const {getBinding} = operator',
    getBindingPath: 'const {getBindingPath} = operator',
    traverse: 'const {traverse} = operator',
    isSimpleRegExp: 'const {isSimpleRegExp} = operator',
    getTemplateValues: 'const {getTemplateValues} = operator',
    addArgs: 'const {addArgs} = operator',
    insertBefore: 'const {insertBefore} = operator',
    insertAfter: 'const {insertAfter} = operator',
    replaceWith: 'const {replaceWith} = operator',
    replaceWithMultiple: 'const {replaceWithMultiple} = operator',
    remove: 'const {remove} = operator',
    isESM: 'const {isESM} = operator',
    getProperty: 'const {getProperty} = operator',
    getProperties: 'const {getProperties} = operator',
    traverseProperties: 'const {traverseProperties} = operator',
    isSimple: 'const {isSimple} = operator',
    setLiteralValue: 'const {setLiteralValue} = operator',
    matchFiles: 'const {matchFiles} = operator',
    ignore: 'const {ignore} = operator',
};
