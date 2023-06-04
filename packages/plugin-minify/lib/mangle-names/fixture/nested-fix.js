await b();

function a(_, B) {
    const {stdin: c} = process;
    let d = '';
    
    const e = () => {
        const A = c.read();
        
        if (A)
            return d += A;
        
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
    
    const {readOptions: _} = await import('../lib/read-options.mjs');
    const [B, c] = await tryToCatch(_);
    
    if (B)
        return log.error(B.message);
    
    if (a)
        return a(processStream, c);
    
    await uglifyFiles(files, c);
}
