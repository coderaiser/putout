await c();

function a(_a, _c) {
    const {stdin: d} = process;
    let e = '';
    
    const f = () => {
        const _temp = d.read();
        
        if (_temp)
            return e += _temp;
        
        d.removeListener('readable', f);
        _a(e, _c);
    };
    
    d.setEncoding('utf8');
    d.addListener('readable', f);
}

async function c() {
    if (!In || /^(-h|--help)$/.test(In))
        return help();
    
    if (/^(-v|--version)$/.test(In))
        return log(`v${Version}`);
    
    const {readOptions: _c} = await import('../lib/read-options.mjs');
    const [d, e] = await tryToCatch(_c);
    
    if (d)
        return log.error(d.message);
    
    if (a)
        return a(processStream, e);
    
    await uglifyFiles(files, e);
}
