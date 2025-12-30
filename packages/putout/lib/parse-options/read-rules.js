import {join} from 'node:path';
import tryCatch from 'try-catch';

const isInclude = (a) => {
    if (a[0] === '.')
        return false;
    
    if (/(^not-rule-.*|^node_modules$)/.test(a))
        return false;
    
    return !a.endsWith('.md');
};

export const readRules = (dirOpt, rulesDir, overrides) => {
    if (!rulesDir)
        return {};
    
    const {cwd, readdirSync} = overrides;
    
    let dir = join(dirOpt, rulesDir);
    
    if (!dir.startsWith('/'))
        dir = join(cwd, rulesDir);
    
    const [e, names] = tryCatch(readdirSync, dir);
    
    if (e)
        return {};
    
    const plugins = [];
    
    for (const name of names.filter(isInclude)) {
        const full = join(dir, name);
        
        plugins.push(`import:${full}`);
    }
    
    return {
        plugins,
    };
};
