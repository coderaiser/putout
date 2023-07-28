'use strict';

const {operator, template} = require('putout');

const {
    remove,
    getPathAfterImports,
    insertBefore,
} = operator;

const initStopAll = template.ast(`const {stopAll} = createMockImport(import.meta.url)`);

module.exports.report = () => '"mockImport" should be used instead of "mockRequire"';

module.exports.replace = () => ({
    'mockRequire(__a, __b)': 'mockImport(__a, __b)',
    'reRequire(__a)': (vars, path) => {
        const {scope} = path;
        const {block} = scope;
        
        if (!block.async)
            block.async = true;
        
        if (!scope.hasBinding('createMockImport')) {
            const programScope = scope.getProgramParent();
            const programPath = programScope.path;
            
            maybeRemoveOldStopAll(scope);
            
            const endOfImportPath = getPathAfterImports(programPath.get('body'));
            insertBefore(endOfImportPath, initStopAll);
        }
        
        return 'await reImport(__a)';
    },
});

function maybeRemoveOldStopAll(scope) {
    const binding = scope.getBinding('stopAll');
    
    if (!binding)
        return;
    
    const {path} = binding;
    
    if (path) {
        remove(path);
        path.scope.crawl();
    }
}
