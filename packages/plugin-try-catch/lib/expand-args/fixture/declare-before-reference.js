import {parse as parseCst} from 'sql-parser-cst';

const parseCstDialect = (source, dialect) => parseCst(source, {
    dialect,
});

export const parseSql = (source) => {
    let error;
    let cst;
    
    for (const dialect of DIALECTS) {
        [error, cst] = tryCatch(parseCstDialect, source, dialect);
        
        if (cst)
            return convertSource(cst);
    }
    
    throw error;
};

const convertSource = (cst) => cst;
