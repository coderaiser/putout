'use strict';

const {
    template,
    operator,
} = require('putout');

const {getPathAfterImports} = operator;

const importSimport = template.ast(`import {createCommons} from 'simport'`);
const initCommons = template.ast(`const {__filename, __dirname, require} = createCommons(import.meta.url)`);

module.exports.report = () => '"__filename" and "__dirname" should be declared';

module.exports.fix = (path) => {
    const {scope} = path;
    const programScope = scope.getProgramParent();
    const body = programScope.path.get('body');
    const afterImportPath = getPathAfterImports(body);
    
    afterImportPath.insertBefore(importSimport);
    afterImportPath.insertBefore(initCommons);
    
    programScope.crawl();
};

module.exports.include = () => [
    '__filename',
    '__dirname',
    'require',
];

module.exports.filter = (path) => {
    const {scope} = path;
    
    const isDirname = scope.hasBinding('__dirname');
    const isFilename = scope.hasBinding('__filename');
    const isRequire = scope.hasBinding('require');
    
    return !isDirname && !isFilename && !isRequire;
};

