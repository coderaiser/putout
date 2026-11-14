import {parse as parseCst} from 'sql-parser-cst';

export const parseSql = (source) => {
    let error;
    let cst;
    
    for (const dialect of DIALECTS) {
        [error, cst] = tryCatch(parseCst, source, {
            dialect,
        });
        
        if (cst)
            return convertSource(cst);
    }
    
    throw error;
};

const convertSource = (cst) => cst;
