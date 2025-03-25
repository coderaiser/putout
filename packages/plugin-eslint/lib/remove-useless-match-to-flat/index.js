import {operator} from 'putout';

const {compare, remove} = operator;

export const report = () => `Avoid useless 'matchToFlat()'`;

const EXPORT_LET_MATCH = 'export let match';

export const match = () => ({
    'matchToFlat(match)': (vars, path) => getExportLetMatch(path),
});

export const replace = () => ({
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
