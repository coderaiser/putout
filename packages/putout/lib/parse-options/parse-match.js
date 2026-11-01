import picomatch from 'picomatch';

const {keys, assign} = Object;
const matchers = new Map();

const getMatcher = (glob) => {
    if (matchers.has(glob))
        return matchers.get(glob);
    
    const paths = [
        glob,
        `**/${glob}`,
        `${glob}/**`,
        `**/${glob}/**`,
    ];
    
    const isMatch = picomatch(paths, {
        dot: true,
    });
    
    matchers.set(glob, isMatch);
    
    return isMatch;
};

export const parseMatch = (name, match) => {
    if (!match || !name)
        return {};
    
    const rules = {};
    const globs = keys(match);
    
    for (const glob of globs) {
        const isMatch = getMatcher(glob);
        
        if (isMatch(name))
            assign(rules, match[glob]);
    }
    
    return {
        rules,
    };
};
