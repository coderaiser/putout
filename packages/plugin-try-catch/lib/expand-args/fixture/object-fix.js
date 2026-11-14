import {parse as parseCst} from 'sql-parser-cst';

const DIALECTS = [
    'postgresql',
    'sqlite',
];

export const parseSql = (source) => {
    let cst;
    let error;
    
    for (const dialect of DIALECTS) {
        [error, cst] = tryCatch(parseCst, source, {
            dialect,
            paramTypes: [':name'],
            includeRange: true,
            includeComments: true,
        });
        
        if (cst)
            return convertSource(cst);
    }
    
    throw error;
};
