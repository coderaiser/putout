await b();

function a(A, _) {
    const {stdin: c} = process;
    let d = '';
    
    const e = () => {
        const B = c.read();
        
        if (B)
            return d += B;
        
        c.removeListener('readable', e);
        A(d, _);
    };
    
    c.setEncoding('utf8');
    c.addListener('readable', e);
}

async function b() {
    if (!In || /^(-h|--help)$/.test(In))
        return help();
    
    if (/^(-v|--version)$/.test(In))
        return log(`v${Version}`);
    
    const {readOptions: C} = await import('../lib/read-options.mjs');
    const [_b, _c] = await tryToCatch(C);
    
    if (_b)
        return log.error(_b.message);
    
    if (a)
        return a(processStream, _c);
    
    await uglifyFiles(files, _c);
}
