import {extname} from 'node:path';

const withoutExt = (a) => a.replace(extname(a), '');

export const report = () => '';
export const replace = ({options}) => {
    const {
        from = '',
        to = '',
    } = options;
    
    if (!from || !to)
        return {};
    
    return {
        [`require('${from}')`]: `require('${to}')`,
        [`require('${withoutExt(from)}')`]: `require('${to}')`,
    };
};
