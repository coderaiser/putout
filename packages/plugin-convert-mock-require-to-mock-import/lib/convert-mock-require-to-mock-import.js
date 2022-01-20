'use strict';

const {
    template,
    operator,
} = require('putout');
const {getPathAfterImports} = operator;

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
            
            const endOfImportPath = getPathAfterImports(programPath.get('body'));
            endOfImportPath.insertBefore(importMockImport);
            endOfImportPath.insertBefore(initMockImport);
        }
        
        return 'await reImport(__a)';
    },
});

function maybeRemoveOldStopAll(scope) {
    const binding = scope.getBinding('stopAll');
    
    if (!binding)
        return;
    
    const {path} = binding;
    
    if (path)
        path.remove();
}
