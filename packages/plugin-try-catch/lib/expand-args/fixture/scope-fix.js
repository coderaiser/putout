import {parseCst} from 'sql-parser';

export const parseSql = (source) => {
    const [error, cst] = tryCatch(parseCst, source);
    
    return [error, cst];
};
