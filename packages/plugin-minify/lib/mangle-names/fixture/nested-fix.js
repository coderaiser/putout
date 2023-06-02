await c();

function a(_a, _c) {
    const {stdin: e} = process;
    let g = '';
    
    const i = () => {
        const _temp = e.read();
        
        if (_temp)
            return g += _temp;
        
        e.removeListener('readable', i);
        _a(g, _c);
    };
    
    e.setEncoding('utf8');
    e.addListener('readable', i);
}

async function c() {
    if (!In || /^(-h|--help)$/.test(In))
        return help();
    
    if (/^(-v|--version)$/.test(In))
        return log(`v${Version}`);
    
    const {readOptions: _a} = await import('../lib/read-options.mjs');
    const [_c, e] = await tryToCatch(_a);
    
    if (_c)
        return log.error(_c.message);
    
    if (a)
        return a(processStream, e);
    
    await uglifyFiles(files, e);
}
