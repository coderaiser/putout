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
    
    const {readOptions: _a} = await import('../lib/read-options.mjs');
    const [_b, _c] = await tryToCatch(_a);
    
    if (_b)
        return log.error(_b.message);
    
    if (a)
        return A(processStream, _c);
    
    await uglifyFiles(files, _c);
}
