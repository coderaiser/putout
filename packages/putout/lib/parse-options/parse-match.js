import picomatch from 'picomatch';

const {keys, assign} = Object;

export const parseMatch = (name, match) => {
    if (!match || !name)
        return {};
    
    const rules = {};
    const globs = keys(match);
    
    for (const glob of globs) {
        const paths = [
            glob,
            `**/${glob}`,
            `${glob}/**`,
            `**/${glob}/**`,
        ];
        
        const isMatch = picomatch(paths, {
            dot: true,
        });
        
        if (isMatch(name))
            assign(rules, match[glob]);
    }
    
    return {
        rules,
    };
};
