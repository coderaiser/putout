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
    
    const {readOptions: A} = await import('../lib/read-options.mjs');
    const [_, c] = await tryToCatch(A);
    
    if (_)
        return log.error(_.message);
    
    if (a)
        return a(processStream, c);
    
    await uglifyFiles(files, c);
}
