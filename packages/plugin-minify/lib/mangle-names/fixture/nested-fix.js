await b();

function A(_, B) {
    const {stdin: c} = process;
    let d = '';
    
    const e = () => {
        const C = c.read();
        
        if (C)
            return d += C;
        
        c.removeListener('readable', e);
        _(d, B);
    };
    
    c.setEncoding('utf8');
    c.addListener('readable', e);
}

async function b() {
    if (!In || /^(-h|--help)$/.test(In))
        return help();
    
    if (/^(-v|--version)$/.test(In))
        return log(`v${Version}`);
    
    const {readOptions: D} = await import('../lib/read-options.mjs');
    const [E, bJ] = await tryToCatch(D);
    
    if (E)
        return log.error(E.message);
    
    if (a)
        return A(processStream, bJ);
    
    await uglifyFiles(files, bJ);
}
