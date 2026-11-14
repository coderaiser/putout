import {parse as parseCst} from 'sql-parser-cst';

const DIALECTS = [
    'postgresql',
    'sqlite',
];

const parseCstDialect = (source, dialect) => parseCst(source, {
    dialect,
    paramTypes: [':name'],
    includeRange: true,
    includeComments: true,
});

export const parseSql = (source) => {
    let cst;
    let error;
    
    for (const dialect of DIALECTS) {
        [error, cst] = tryCatch(parseCstDialect, source, dialect);
        
        if (cst)
            return convertSource(cst);
    }
    
    throw error;
};

