module.epxorts.findMadrun = async function findMadrun(cwd) {
    const madrunNames = [
        '.madrun.js',
        '.madrun.mjs',
        '.madrun.cjs',
    ].map(joinPartial(cwd));
    
    for (const name of madrunNames) {
        const [error] = await tryToCatch(access, name);
        
        if (!error)
            return name;
    }
    
    return '';
};
