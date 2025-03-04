'use strict';

const {operator} = require('putout');
const {compare, remove} = operator;

module.exports.report = () => `Avoid useless 'matchToFlat()'`;

const EXPORT_LET_MATCH = 'export let match';

module.exports.match = () => ({
    'matchToFlat(match)': (vars, path) => getExportLetMatch(path),
});

module.exports.replace = () => ({
    'matchToFlat(match)': (vars, path) => {
        const letMatch = getExportLetMatch(path);
        remove(letMatch);
        
        return '';
    },
});

function getExportLetMatch(path) {
    const programScope = path.scope.getProgramParent();
    const programPath = programScope.path;
    
    for (const current of programPath.get('body'))
        if (compare(current, EXPORT_LET_MATCH))
            return current;
    
    return null;
}
