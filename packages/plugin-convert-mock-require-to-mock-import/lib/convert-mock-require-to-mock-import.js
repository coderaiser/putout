'use strict';

const {template} = require('putout');

const importMockImport = template.ast(`import {createMockImport} from 'mock-import'`);
const initMockImport = template.ast(`const {mockImport, reImport, stopAll} = createMockImport(import.meta.url)`);

module.exports.report = () => '"mockImport" should be used instead of "mockRequire"';

module.exports.replace = () => ({
    'mockRequire(__a, __b)': 'mockImport(__a, __b)',
    'reRequire(__a)': (vars, path) => {
        const {scope} = path;
        const {block} = scope;
        
        if (!block.async)
            block.async = true;
        
        const programScope = scope.getProgramParent();
        const programPath = programScope.path;
        
        if (!scope.hasBinding('createMockImport')) {
            maybeRemoveOldStopAll(scope);
            
            const endOfImportPath = getImportEnd(programPath.get('body'));
            endOfImportPath.insertBefore(importMockImport);
            endOfImportPath.insertBefore(initMockImport);
        }
        
        programPath.scope.crawl();
        
        return 'await reImport(__a)';
    },
});

function getImportEnd(body) {
    let resultPath = body[body.length - 1];
    
    for (const path of body) {
        if (path.type !== 'ImportDeclaration') {
            resultPath = path;
            break;
        }
    }
    
    return resultPath;
}

function maybeRemoveOldStopAll(scope) {
    const {path} = scope.getBinding('stopAll');
    
    if (path)
        path.remove();
}
