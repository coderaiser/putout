import chalk from 'chalk';

const {red} = chalk;

export const createExit = ({halt, raw, logError}) => (code, e) => {
    if (!code)
        return halt(0);
    
    if (!e)
        return halt(code);
    
    const message = raw ? e : red(`🐊 ${e.message || e}`);
    
    logError(message);
    halt(code);
    
    return {
        exited: true,
    };
};
