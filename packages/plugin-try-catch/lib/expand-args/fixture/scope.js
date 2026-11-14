import {parseCst} from 'sql-parser';

const parse = (source) => parseCst(source);

export const parseSql = (source) => {
    const [error, cst] = tryCatch(parse);
    
    return [error, cst];
};
